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
import { toast } from "sonner";
import { LogOut, FileText, Phone, Mail, MapPin, Calendar, Clock, Home, Bath, Bed } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Quote = Tables<"quotes">;

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
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchQuotes();

    // Subscribe to real-time updates
    const channel = supabase
      .channel("quotes_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "quotes" },
        () => {
          fetchQuotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Quotes</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pending</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Contacted</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.contacted}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Quoted</CardDescription>
              <CardTitle className="text-3xl text-purple-600">{stats.quoted}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Approved</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.approved}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-64">
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
            <CardTitle>All Quote Requests</CardTitle>
            <CardDescription>
              Manage and respond to customer quote requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading quotes...</div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No quotes found</div>
            ) : (
              <div className="overflow-x-auto">
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
            )}
          </CardContent>
        </Card>
      </main>

      {/* Quote Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateQuote}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

