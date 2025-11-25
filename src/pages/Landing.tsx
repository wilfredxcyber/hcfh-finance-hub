import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Wallet, HandCoins, Shield, Network, Coins, FileText, Target } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-background via-primary/5 to-accent/5 flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Herckerton Community Finance Hub
          </h1>
          <p className="text-2xl md:text-3xl text-foreground font-medium">
            A blockchain-powered community savings and micro-lending platform
          </p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Helping micro-entrepreneurs in Herckerton access transparent, cooperative financial tools without middlemen.
          </p>
          <div className="pt-4">
            <Button
              onClick={() => navigate("/connect")}
              size="lg"
              className="text-lg px-10 py-7 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Enter App
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">About HCFH</h2>
          <p className="text-xl text-center text-muted-foreground mb-8">
            HCFH is a digital cooperative built on the Camp Network blockchain.
          </p>
          <Card className="border-border/50 shadow-card">
            <CardContent className="p-8">
              <p className="text-lg text-foreground mb-6 font-medium">It allows community members to:</p>
              <ul className="space-y-4 text-lg text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Save money together in a shared vault</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Borrow small loans instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Track everything transparently on-chain</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Build trust through open, decentralized finance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Grow local small businesses without relying on traditional banks</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 shadow-card hover:shadow-glow transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Save Into the Community Vault</h3>
                <p className="text-muted-foreground">
                  Members deposit tokens (HCT) into a shared savings vault.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-card hover:shadow-glow transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <HandCoins className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Borrow When Needed</h3>
                <p className="text-muted-foreground">
                  Users request small loans directly from the vault with transparent rules.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-card hover:shadow-glow transition-shadow duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Repay With Trust</h3>
                <p className="text-muted-foreground">
                  All loan data and interest calculations are handled by smart contracts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Technology</h2>
          <p className="text-xl text-center text-muted-foreground mb-12">
            What powers the platform:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6 flex items-center gap-4">
                <Network className="w-8 h-8 text-primary flex-shrink-0" />
                <span className="text-lg text-foreground">Camp Network Smart Contracts</span>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6 flex items-center gap-4">
                <Coins className="w-8 h-8 text-accent flex-shrink-0" />
                <span className="text-lg text-foreground">Community Token (HCT)</span>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6 flex items-center gap-4">
                <Wallet className="w-8 h-8 text-primary flex-shrink-0" />
                <span className="text-lg text-foreground">Savings Vault Contract</span>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6 flex items-center gap-4">
                <HandCoins className="w-8 h-8 text-accent flex-shrink-0" />
                <span className="text-lg text-foreground">Micro-Lending Contract</span>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6 flex items-center gap-4">
                <FileText className="w-8 h-8 text-success flex-shrink-0" />
                <span className="text-lg text-foreground">Fully On-Chain Transparency</span>
              </CardContent>
            </Card>
            <Card className="border-border/50 shadow-card">
              <CardContent className="p-6 flex items-center gap-4">
                <Shield className="w-8 h-8 text-primary flex-shrink-0" />
                <span className="text-lg text-foreground">Secure & Auditable</span>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <Target className="w-16 h-16 mx-auto mb-8 text-primary" />
          <h2 className="text-4xl font-bold mb-8 text-foreground">Our Vision</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            HCFH is designed to uplift real people — vendors, riders, tailors, artisans, food sellers, students, 
            and micro-entrepreneurs — giving them access to financial tools that are normally out of reach. 
            Our goal is to build a self-sustaining, trust-based financial community.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-bold text-foreground">Herckerton Community Finance Hub</h3>
          <p className="text-muted-foreground">Built for the Camp Network Hackathon 2024</p>
          <p className="text-lg text-primary font-medium">Community • Trust • Transparency</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
