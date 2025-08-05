import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, CreditCard, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Order = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    budget: ""
  });
  const [loading, setLoading] = useState(false);

  const services = [
    {
      id: "website",
      name: "Pembuatan Website",
      description: "Website profesional dengan design custom dan fitur sesuai kebutuhan",
      priceRange: "Rp 2.000.000 - Rp 25.000.000"
    },
    {
      id: "bot",
      name: "Pembuatan Bot Otomatis", 
      description: "Bot otomatis untuk WhatsApp, Telegram, atau platform lainnya",
      priceRange: "Rp 1.500.000 - Rp 20.000.000"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.service || !formData.description || !formData.budget) {
        throw new Error("Semua field harus diisi");
      }

      const budget = parseInt(formData.budget.replace(/\D/g, ''));
      if (budget < 1000000) {
        throw new Error("Budget minimum adalah Rp 1.000.000");
      }

      // Calculate DP (10%)
      const dpAmount = Math.round(budget * 0.1);

      // Simulate order creation and redirect to payment
      const orderId = `ORD-${Date.now()}`;
      
      toast({
        title: "Pesanan berhasil dibuat!",
        description: `ID Pesanan: ${orderId}. Anda akan diarahkan ke pembayaran DP.`,
      });

      // Here we would integrate with iPaymu payment gateway
      // For now, redirect back to dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error: any) {
      toast({
        title: "Gagal membuat pesanan",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    return new Intl.NumberFormat('id-ID').format(parseInt(number) || 0);
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setFormData(prev => ({ ...prev, budget: formatted }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-animated absolute inset-0 z-0"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Buat Pesanan Baru</h1>
                <p className="text-muted-foreground">Mulai proyek digital Anda bersama kami</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Selection */}
              <Card className="card-agency">
                <CardHeader>
                  <CardTitle>Pilih Jenis Layanan</CardTitle>
                  <CardDescription>
                    Pilih layanan yang sesuai dengan kebutuhan Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={formData.service} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}
                  >
                    {services.map((service) => (
                      <div key={service.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <RadioGroupItem value={service.id} id={service.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={service.id} className="font-medium cursor-pointer">
                            {service.name}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.description}
                          </p>
                          <p className="text-sm font-medium text-primary mt-2">
                            Range Harga: {service.priceRange}
                          </p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Project Description */}
              <Card className="card-agency">
                <CardHeader>
                  <CardTitle>Deskripsi Proyek</CardTitle>
                  <CardDescription>
                    Jelaskan secara detail kebutuhan dan fitur yang Anda inginkan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Contoh: Saya membutuhkan website e-commerce untuk menjual produk fashion. Fitur yang dibutuhkan: katalog produk, keranjang belanja, sistem pembayaran online, admin panel untuk manage produk, dan sistem notifikasi email..."
                    rows={6}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Semakin detail deskripsi Anda, semakin akurat estimasi dan hasil yang kami berikan
                  </p>
                </CardContent>
              </Card>

              {/* Budget */}
              <Card className="card-agency">
                <CardHeader>
                  <CardTitle>Anggaran Anda</CardTitle>
                  <CardDescription>
                    Masukkan budget yang telah Anda siapkan untuk proyek ini
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="budget">Budget (Rupiah)</Label>
                    <Input
                      id="budget"
                      type="text"
                      value={formData.budget}
                      onChange={handleBudgetChange}
                      placeholder="5.000.000"
                      className="text-lg font-medium"
                    />
                  </div>
                  
                  {formData.budget && (
                    <Alert>
                      <CreditCard className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Down Payment (DP) 10%:</strong> Rp {formatCurrency((parseInt(formData.budget.replace(/\D/g, '')) * 0.1).toString())}
                        <br />
                        <strong>Sisa Pembayaran (90%):</strong> Rp {formatCurrency((parseInt(formData.budget.replace(/\D/g, '')) * 0.9).toString())}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Catatan Penting:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>DP 10% dibayar setelah mengklik "Pesan Sekarang"</li>
                        <li>DP bersifat non-refundable (tidak dapat dikembalikan)</li>
                        <li>Sisa 90% dibayar setelah Anda menyetujui hasil demo</li>
                        <li>Budget minimum adalah Rp 1.000.000</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !formData.service || !formData.description || !formData.budget}
                  className="flex-1 btn-agency"
                >
                  {loading ? "Memproses..." : "Pesan Sekarang & Bayar DP"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;