import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, ExternalLink, MessageCircle, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
          toast({
            title: "Gagal memuat pesanan",
            description: "Tidak dapat mengambil data pesanan dari server",
            variant: "destructive",
          });
        } else {
          setOrders(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
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

  const getWhatsAppLink = (orderId: string) => {
    const message = `Halo CRXA NODE, saya ingin membahas pesanan saya dengan ID Pesanan: ${orderId}`;
    return `https://wa.me/6285156371696?text=${encodeURIComponent(message)}`;
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
                <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
                <p className="text-muted-foreground">Kelola pesanan Anda</p>
              </div>
              <div className="flex gap-4">
                <Button onClick={() => navigate('/order')} className="btn-agency">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Pesanan Baru
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Pesanan Anda</h2>
              <Badge variant="secondary">{orders.length} Pesanan</Badge>
            </div>

            {orders.length === 0 ? (
              <Card className="card-agency text-center py-12">
                <CardContent>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Belum Ada Pesanan</h3>
                      <p className="text-muted-foreground mb-4">
                        Mulai proyek digital Anda dengan membuat pesanan pertama
                      </p>
                      <Button onClick={() => navigate('/order')} className="btn-agency">
                        Buat Pesanan Baru
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
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
                            ID Pesanan: {order.id} • Dibuat: {new Date(order.created_at).toLocaleDateString('id-ID')}
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

                      {/* Action buttons based on status */}
                      <div className="flex flex-wrap gap-2">
                        {order.status === "Menunggu Pembayaran DP" && order.payment_url && (
                          <Button asChild className="btn-agency" size="sm">
                            <a href={order.payment_url} target="_blank" rel="noopener noreferrer">
                              Bayar DP (Rp {order.dp_amount?.toLocaleString('id-ID')})
                            </a>
                          </Button>
                        )}

                        {order.status === "Disetujui - Lanjut Diskusi" && (
                          <Button asChild variant="outline" size="sm">
                            <a 
                              href={getWhatsAppLink(order.id)} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Diskusi via WhatsApp
                            </a>
                          </Button>
                        )}
                        
                        {order.demo_link && (
                          <Button asChild variant="outline" size="sm">
                            <a href={order.demo_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Lihat Demo
                            </a>
                          </Button>
                        )}
                        
                        {order.demo_link && !order.final_link && (
                          <Button size="sm" className="btn-agency">
                            Setuju & Lakukan Pelunasan
                          </Button>
                        )}
                        
                        {order.final_link && (
                          <Button asChild variant="outline" size="sm">
                            <a href={order.final_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Link Final Project
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;