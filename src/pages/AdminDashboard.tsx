import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Check, 
  X, 
  LogOut, 
  ExternalLink,
  Eye,
  Users,
  ShoppingCart,
  DollarSign
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([
    // Sample data - will be replaced with Supabase data
    {
      id: "ORD-001",
      userId: "user1",
      userEmail: "customer@email.com",
      userName: "John Doe",
      service: "Pembuatan Website",
      status: "Menunggu Persetujuan Admin",
      description: "Website company profile untuk toko online sepatu dengan fitur keranjang belanja, payment gateway, dan admin panel",
      budget: 5000000,
      createdAt: "2024-01-15T10:30:00Z",
      demoLink: "",
      finalLink: ""
    },
    {
      id: "ORD-002", 
      userId: "user2",
      userEmail: "client@email.com",
      userName: "Jane Smith",
      service: "Pembuatan Bot Otomatis",
      status: "Disetujui - Lanjut Diskusi",
      description: "Bot WhatsApp untuk customer service dengan auto reply dan integrasi CRM",
      budget: 3000000,
      createdAt: "2024-01-14T14:20:00Z",
      demoLink: "",
      finalLink: ""
    }
  ]);

  const handleLogout = () => {
    navigate('/');
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updateOrderLink = (orderId: string, linkType: 'demo' | 'final', url: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, [linkType === 'demo' ? 'demoLink' : 'finalLink']: url }
        : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Menunggu Pembayaran DP":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Menunggu Persetujuan Admin":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "Disetujui - Lanjut Diskusi":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Selesai":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Ditolak":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const stats = {
    totalOrders: orders.length,
    pendingApproval: orders.filter(o => o.status === "Menunggu Persetujuan Admin").length,
    approved: orders.filter(o => o.status === "Disetujui - Lanjut Diskusi").length,
    completed: orders.filter(o => o.status === "Selesai").length,
    totalRevenue: orders.reduce((sum, order) => sum + order.budget, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-animated absolute inset-0 z-0"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold gradient-text">Admin Dashboard</h1>
                <p className="text-muted-foreground">Kelola semua pesanan dan proyek</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="card-agency">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pesanan</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-agency">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Menunggu Persetujuan</p>
                    <p className="text-2xl font-bold">{stats.pendingApproval}</p>
                  </div>
                  <Eye className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-agency">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Disetujui</p>
                    <p className="text-2xl font-bold">{stats.approved}</p>
                  </div>
                  <Check className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-agency">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-lg font-bold">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        notation: 'compact'
                      }).format(stats.totalRevenue)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Management */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Manajemen Pesanan</h2>
            
            {orders.map((order) => (
              <Card key={order.id} className="card-agency">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {order.service}
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        ID: {order.id} • Customer: {order.userName} ({order.userEmail})
                        <br />
                        Dibuat: {new Date(order.createdAt).toLocaleDateString('id-ID')}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="font-semibold">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR'
                        }).format(order.budget)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Deskripsi Proyek:</h4>
                    <p className="text-muted-foreground">{order.description}</p>
                  </div>

                  {/* Action buttons for pending approval */}
                  {order.status === "Menunggu Persetujuan Admin" && (
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "Disetujui - Lanjut Diskusi")}
                        className="btn-agency"
                        size="sm"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Setujui
                      </Button>
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "Ditolak")}
                        variant="destructive"
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Tolak
                      </Button>
                    </div>
                  )}

                  {/* Project management for approved orders */}
                  {(order.status === "Disetujui - Lanjut Diskusi" || order.status === "Selesai") && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor={`demo-${order.id}`}>Link Demo</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`demo-${order.id}`}
                            placeholder="https://demo.example.com"
                            value={order.demoLink}
                            onChange={(e) => updateOrderLink(order.id, 'demo', e.target.value)}
                          />
                          {order.demoLink && (
                            <Button asChild variant="outline" size="sm">
                              <a href={order.demoLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`final-${order.id}`}>Link Final</Label>
                        <div className="flex gap-2">
                          <Input
                            id={`final-${order.id}`}
                            placeholder="https://final.example.com"
                            value={order.finalLink}
                            onChange={(e) => updateOrderLink(order.id, 'final', e.target.value)}
                          />
                          {order.finalLink && (
                            <Button asChild variant="outline" size="sm">
                              <a href={order.finalLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;