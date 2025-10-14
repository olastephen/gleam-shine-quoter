import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { LogOut, FileText, Phone, Mail, MapPin, Calendar, Clock, Home, Bath, Bed, UserPlus, Users, Wrench } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import logo from "@/assets/logo.png";

type Quote = Tables<"quotes">;
type AdminUser = Tables<"admin_users">;

const statusColors: Record<Quote["status"], string> = {
  pending: "bg-yellow-500",
  contacted: "bg-blue-500",
  quoted: "bg-purple-500",
  approved: "bg-green-500",
  rejected: "bg-red-500",
  completed: "bg-gray-500",
};

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string>("admin");
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserFullName, setNewUserFullName] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "super_admin">("admin");
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchQuotes();
    fetchAdminUsers();

    // Subscribe to real-time updates for quotes
    const quotesChannel = supabase
      .channel("quotes_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "quotes" },
        () => {
          fetchQuotes();
        }
      )
      .subscribe();

    // Subscribe to real-time updates for admin users
    const usersChannel = supabase
      .channel("admin_users_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "admin_users" },
        () => {
          fetchAdminUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(quotesChannel);
      supabase.removeChannel(usersChannel);
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    } else {
      // Get current user's role
      const { data: userData, error } = await supabase
        .from("admin_users")
        .select("role")
        .eq("id", session.user.id)
        .single();
      
      if (error) {
        console.error("Error fetching user role:", error);
        // If user not in admin_users table, log them out
        await supabase.auth.signOut();
        navigate("/admin/login");
        toast.error("Unauthorized access");
        return;
      }
      
      if (userData) {
        setCurrentUserRole(userData.role);
      }
    }
  };

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      toast.error("Failed to fetch quotes");
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error) {
      console.error("Error fetching admin users:", error);
    }
  };

  const handleCreateUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast.error("Email and password are required");
      return;
    }

    try {
      // Create user without email confirmation (as configured in Supabase settings)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          emailRedirectTo: undefined, // No email confirmation needed
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Add user to admin_users table
        const { error: insertError } = await supabase
          .from("admin_users")
          .insert({
            id: authData.user.id,
            email: newUserEmail,
            full_name: newUserFullName || null,
            role: newUserRole,
          });

        if (insertError) throw insertError;

        toast.success(`Admin user created successfully. Email: ${newUserEmail}`);
        setUserDialogOpen(false);
        setNewUserEmail("");
        setNewUserFullName("");
        setNewUserPassword("");
        setNewUserRole("admin");
        fetchAdminUsers();
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Failed to create user");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this admin user?")) return;

    try {
      // Delete from admin_users table (auth user deletion requires service role)
      const { error } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      toast.success("Admin user deleted successfully");
      fetchAdminUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
    toast.success("Logged out successfully");
  };

  const handleViewQuote = (quote: Quote) => {
    setSelectedQuote(quote);
    setDialogOpen(true);
  };

  const handleUpdateQuote = async () => {
    if (!selectedQuote) return;

    try {
      const { error } = await supabase
        .from("quotes")
        .update({
          status: selectedQuote.status,
          quote_amount: selectedQuote.quote_amount,
          admin_notes: selectedQuote.admin_notes,
        })
        .eq("id", selectedQuote.id);

      if (error) throw error;

      toast.success("Quote updated successfully");
      setDialogOpen(false);
      fetchQuotes();
    } catch (error) {
      console.error("Error updating quote:", error);
      toast.error("Failed to update quote");
    }
  };

  const handleDeleteQuote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;

    try {
      const { error } = await supabase.from("quotes").delete().eq("id", id);

      if (error) throw error;

      toast.success("Quote deleted successfully");
      fetchQuotes();
    } catch (error) {
      console.error("Error deleting quote:", error);
      toast.error("Failed to delete quote");
    }
  };

  const filteredQuotes = filterStatus === "all" 
    ? quotes 
    : quotes.filter(q => q.status === filterStatus);

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === "pending").length,
    contacted: quotes.filter(q => q.status === "contacted").length,
    quoted: quotes.filter(q => q.status === "quoted").length,
    approved: quotes.filter(q => q.status === "approved").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Fresh Shine Solutions" className="h-10 sm:h-12" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Products Used Section */}
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              <CardTitle className="text-lg">Products & Tools</CardTitle>
            </div>
            <CardDescription>Technology stack and services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              <a 
                href="https://vercel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico" alt="Vercel" className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Vercel</p>
                <p className="text-xs text-gray-500">Hosting</p>
              </a>
              <a 
                href="https://www.ionos.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="https://www.ionos.com/favicon.ico" alt="IONOS" className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">IONOS</p>
                <p className="text-xs text-gray-500">Domain</p>
              </a>
              <a 
                href="https://supabase.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="https://supabase.com/favicon/favicon-32x32.png" alt="Supabase" className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Supabase</p>
                <p className="text-xs text-gray-500">Database</p>
              </a>
              <a 
                href="https://mail.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" alt="Gmail" className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Gmail</p>
                <p className="text-xs text-gray-500">Email</p>
              </a>
              <a 
                href="https://www.trustpilot.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-black.svg" alt="Trustpilot" className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Trustpilot</p>
                <p className="text-xs text-gray-500">Reviews</p>
              </a>
              <a 
                href="https://analytics.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Analytics" className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Google Analytics</p>
                <p className="text-xs text-gray-500">Analytics</p>
              </a>
              <a 
                href="https://search.google.com/search-console" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google Search Console" className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Google Search Console</p>
                <p className="text-xs text-gray-500">SEO</p>
              </a>
              <a 
                href="https://www.bing.com/webmasters" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img src="https://www.bing.com/sa/simg/bing_p_rr_teal_min.ico" alt="Bing Webmaster Tools" className="h-10 w-10 mb-2" />
                <p className="text-sm font-medium">Bing Search Console</p>
                <p className="text-xs text-gray-500">SEO</p>
              </a>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="quotes" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="quotes">Quote Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-6">
        {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Total Quotes</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Pending</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl text-yellow-600">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Contacted</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl text-blue-600">{stats.contacted}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Quoted</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl text-purple-600">{stats.quoted}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs sm:text-sm">Approved</CardDescription>
              <CardTitle className="text-2xl sm:text-3xl text-green-600">{stats.approved}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filter */}
            <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Filter Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quotes</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Quotes Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">All Quote Requests</CardTitle>
            <CardDescription className="text-sm">
              Manage and respond to customer quote requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading quotes...</div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No quotes found</div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Quote Amount</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuotes.map((quote) => (
                        <TableRow key={quote.id}>
                          <TableCell className="whitespace-nowrap">
                            {new Date(quote.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium">{quote.email}</span>
                              <span className="text-sm text-gray-500">{quote.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell className="capitalize">
                            {quote.service_type.replace(/([A-Z])/g, " $1").trim()}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {quote.address}
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[quote.status]}>
                              {quote.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {quote.quote_amount ? `£${quote.quote_amount.toFixed(2)}` : "-"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewQuote(quote)}
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteQuote(quote.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile Card View */}
                <div className="lg:hidden space-y-4">
                  {filteredQuotes.map((quote) => (
                    <Card key={quote.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={statusColors[quote.status]}>
                                {quote.status}
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {new Date(quote.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="font-medium text-sm">{quote.email}</h3>
                            <p className="text-xs text-gray-500">{quote.phone}</p>
                          </div>
                          {quote.quote_amount && (
                            <div className="text-right">
                              <span className="font-medium">£{quote.quote_amount.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Service:</span>{' '}
                            <span className="capitalize">
                              {quote.service_type.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Address:</span>{' '}
                            <span className="truncate block">{quote.address}</span>
                          </p>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewQuote(quote)}
                            className="flex-1"
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteQuote(quote.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">Admin Users</CardTitle>
                    <CardDescription className="hidden sm:block">Manage administrator access</CardDescription>
                  </div>
                  {currentUserRole === "super_admin" && (
                    <Button onClick={() => setUserDialogOpen(true)} size="sm">
                      <UserPlus className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">Add User</span>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {adminUsers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No admin users found</div>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Created</TableHead>
                            {currentUserRole === "super_admin" && <TableHead>Actions</TableHead>}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {adminUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.full_name || "-"}</TableCell>
                              <TableCell>
                                <Badge variant={user.role === "super_admin" ? "default" : "secondary"}>
                                  {user.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {new Date(user.created_at).toLocaleDateString()}
                              </TableCell>
                              {currentUserRole === "super_admin" && (
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                      {adminUsers.map((user) => (
                        <Card key={user.id} className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant={user.role === "super_admin" ? "default" : "secondary"}>
                                    {user.role}
                                  </Badge>
                                  <span className="text-sm text-gray-500">
                                    {new Date(user.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <h3 className="font-medium text-sm break-all">{user.email}</h3>
                                <p className="text-xs text-gray-500">{user.full_name || "No name"}</p>
                              </div>
                            </div>
                            
                            {currentUserRole === "super_admin" && (
                              <div className="pt-2">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="w-full"
                                >
                                  Delete User
                                </Button>
                              </div>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Quote Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-0">
          <DialogHeader>
            <DialogTitle>Quote Details</DialogTitle>
            <DialogDescription>
              View and manage quote request
            </DialogDescription>
          </DialogHeader>

          {selectedQuote && (
            <div className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Customer Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedQuote.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedQuote.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Property Details</h3>
                <div className="grid gap-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{selectedQuote.address}</p>
                      {selectedQuote.postcode && (
                        <p className="text-sm text-gray-600">{selectedQuote.postcode}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedQuote.bedrooms && (
                      <div className="flex items-center gap-2">
                        <Bed className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Bedrooms</p>
                          <p className="font-medium">{selectedQuote.bedrooms}</p>
                        </div>
                      </div>
                    )}
                    {selectedQuote.bathrooms && (
                      <div className="flex items-center gap-2">
                        <Bath className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Bathrooms</p>
                          <p className="font-medium">{selectedQuote.bathrooms}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Service Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Service Type</p>
                      <p className="font-medium capitalize">
                        {selectedQuote.service_type.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                    </div>
                  </div>
                  {selectedQuote.preferred_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Preferred Date</p>
                        <p className="font-medium">
                          {new Date(selectedQuote.preferred_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedQuote.preferred_time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Preferred Time</p>
                        <p className="font-medium">{selectedQuote.preferred_time}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Admin Actions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Admin Actions</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={selectedQuote.status}
                      onValueChange={(value) =>
                        setSelectedQuote({ ...selectedQuote, status: value as Quote["status"] })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quote_amount">Quote Amount (£)</Label>
                    <Input
                      id="quote_amount"
                      type="number"
                      step="0.01"
                      value={selectedQuote.quote_amount || ""}
                      onChange={(e) =>
                        setSelectedQuote({
                          ...selectedQuote,
                          quote_amount: e.target.value ? parseFloat(e.target.value) : null,
                        })
                      }
                      placeholder="Enter quote amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin_notes">Admin Notes</Label>
                    <Textarea
                      id="admin_notes"
                      value={selectedQuote.admin_notes || ""}
                      onChange={(e) =>
                        setSelectedQuote({ ...selectedQuote, admin_notes: e.target.value })
                      }
                      placeholder="Add internal notes about this quote..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleUpdateQuote} className="w-full sm:w-auto">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
        <DialogContent className="max-w-md mx-4 sm:mx-0">
          <DialogHeader>
            <DialogTitle>Add New Admin User</DialogTitle>
            <DialogDescription>
              Create a new administrator account
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new_email">Email</Label>
              <Input
                id="new_email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new_full_name">Full Name (Optional)</Label>
              <Input
                id="new_full_name"
                type="text"
                value={newUserFullName}
                onChange={(e) => setNewUserFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new_password">Password</Label>
              <Input
                id="new_password"
                type="password"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new_role">Role</Label>
              <Select
                value={newUserRole}
                onValueChange={(value) => setNewUserRole(value as "admin" | "super_admin")}
              >
                <SelectTrigger id="new_role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setUserDialogOpen(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleCreateUser} className="w-full sm:w-auto">
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

