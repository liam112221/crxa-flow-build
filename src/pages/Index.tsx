import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Bot, Users, Star, MessageCircle, CheckCircle, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Pembuatan Website",
      description: "Website kustom yang responsive, modern, dan sesuai kebutuhan bisnis Anda",
      priceRange: "Rp 2.000.000 - Rp 25.000.000",
      features: ["Design Responsive", "SEO Optimized", "CMS Integration", "E-commerce Ready"]
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "Pembuatan Bot Otomatis", 
      description: "Bot otomatis untuk WhatsApp, Telegram, Discord dan platform lainnya",
      priceRange: "Rp 1.500.000 - Rp 20.000.000",
      features: ["Multi Platform", "AI Integration", "Auto Response", "Analytics Dashboard"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Konsultasi & Pemesanan",
      description: "Daftar akun, pilih layanan, dan deskripsikan kebutuhan Anda dengan detail"
    },
    {
      step: "02", 
      title: "Pembayaran DP 10%",
      description: "Bayar down payment untuk memulai proses dan mengalokasikan tim developer"
    },
    {
      step: "03",
      title: "Persetujuan & Diskusi",
      description: "Tim kami review dan setujui proyek, lalu diskusi detail via WhatsApp"
    },
    {
      step: "04",
      title: "Development & Demo",
      description: "Proses pengerjaan dimulai dan Anda akan mendapat link demo untuk review"
    },
    {
      step: "05",
      title: "Pelunasan & Delivery",
      description: "Setelah demo disetujui, lakukan pelunasan dan terima hasil final"
    }
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "CEO, TechStart",
      content: "Website e-commerce yang dibuat CRXA NODE sangat profesional dan meningkatkan penjualan kami 300%!",
      rating: 5
    },
    {
      name: "Sarah Rahman", 
      role: "Marketing Manager",
      content: "Bot WhatsApp otomatis mereka membantu customer service kami jadi 24/7. Sangat recommended!",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Bagaimana cara memesan jasa?",
      answer: "Anda cukup mendaftar/login ke akun Anda, klik tombol 'Buat Pesanan Baru', pilih layanan yang diinginkan, jelaskan kebutuhan Anda pada kolom deskripsi, dan ajukan budget Anda. Setelah itu, Anda akan diminta membayar DP 10% untuk memulai proses."
    },
    {
      question: "Untuk apa pembayaran DP 10%?",
      answer: "DP (Down Payment) sebesar 10% berfungsi sebagai tanda keseriusan dan komitmen Anda. Dana ini kami gunakan untuk alokasi sumber daya awal dan memulai tahap konsultasi serta perencanaan proyek Anda. DP ini bersifat non-refundable (tidak dapat dikembalikan)."
    },
    {
      question: "Apa yang terjadi setelah saya membayar DP?",
      answer: "Setelah DP terkonfirmasi, pesanan Anda akan masuk ke antrian kami untuk direview oleh tim admin. Jika budget dan deskripsi proyek Anda sesuai, kami akan menyetujuinya. Anda akan melihat status pesanan berubah dan mendapatkan link WhatsApp untuk diskusi lebih lanjut."
    },
    {
      question: "Kapan saya harus membayar sisa tagihan?",
      answer: "Anda akan membayar sisa tagihan 90% setelah kami menyelesaikan pengerjaan dan mengirimkan link demo. Jika Anda sudah puas dengan demonya, Anda dapat melakukan pelunasan untuk mendapatkan link final proyek Anda."
    },
    {
      question: "Apakah saya bisa meminta revisi?",
      answer: "Tentu. Proses diskusi melalui WhatsApp setelah persetujuan admin adalah waktu yang tepat untuk menyamakan persepsi dan detail. Revisi minor dapat dilakukan pada tahap demo. Revisi besar yang mengubah keseluruhan konsep awal mungkin akan dikenakan biaya tambahan."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="bg-animated absolute inset-0 z-0"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">CRXA NODE</div>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button className="btn-agency" onClick={() => navigate('/register')}>
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Digital Agency</span>
            <br />
            Terpercaya
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Kami menyediakan jasa pembuatan website kustom dan bot otomatis 
            dengan kualitas profesional dan harga bersaing
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="btn-agency text-lg px-8 py-4" onClick={() => navigate('/register')}>
              Mulai Proyek Anda <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10">
              Lihat Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Layanan Kami</h2>
            <p className="text-xl text-muted-foreground">Solusi digital terbaik untuk bisnis Anda</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="card-agency hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">{service.priceRange}</Badge>
                    </div>
                  </div>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative z-10 py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Proses Pemesanan</h2>
            <p className="text-xl text-muted-foreground">Langkah mudah untuk mewujudkan proyek Anda</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {processSteps.map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/20 text-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold glow-effect">
                  {process.step}
                </div>
                <h3 className="font-semibold mb-2">{process.title}</h3>
                <p className="text-sm text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Apa Kata Klien Kami</h2>
            <p className="text-xl text-muted-foreground">Testimoni dari klien yang puas</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-agency">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Pertanyaan yang sering diajukan</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-agency">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Siap Memulai Proyek Anda?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Bergabunglah dengan ratusan klien yang telah mempercayai kami
          </p>
          <Button size="lg" className="btn-agency text-lg px-8 py-4" onClick={() => navigate('/register')}>
            Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">CRXA NODE</h3>
              <p className="text-muted-foreground mb-4">
                Digital agency terpercaya untuk solusi website dan bot otomatis
              </p>
              <div className="flex gap-4">
                <Badge variant="outline">Bekasi, Indonesia</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Pembuatan Website</li>
                <li>Pembuatan Bot</li>
                <li>Konsultasi Digital</li>
                <li>Maintenance & Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kebijakan</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Syarat & Ketentuan</li>
                <li>Kebijakan Refund</li>
                <li>Privacy Policy</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>085156371696</span>
                </li>
                <li>carakawidi07@gmail.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 CRXA NODE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;