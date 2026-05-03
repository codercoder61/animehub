import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimeSlider from '@/components/AnimeSlider';
import AnimeCard from '@/components/AnimeCard';
import { mockAnimeData } from '@/lib/mockData';
import { Flame, TrendingUp, Users, PlayCircle, Server } from 'lucide-react';

export default function Home() {
  const topRatedAnime = [...mockAnimeData];

  const stats = [
    {
      icon: PlayCircle,
      label: 'مجموع الحلقات',
      value: '25K+',
    },
    {
      icon: TrendingUp,
      label: 'عناوين الانمي',
      value: "1500+",
    },
    {
      icon: Users,
      label: 'المستخدمون النشطون',
      value: '25K+',
    },
    {
      icon: Server,
      label: 'إجمالي الخوادم',
      value: '100K+',
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Slider */}
        <section className="container mx-auto px-4 py-8">
          <AnimeSlider animes={mockAnimeData} />
        </section>

        {/* Statistics Section */}
        <section className="py-12 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/20">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Top Rated Anime */}
        <section dir="rtl" className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1 h-8 bg-primary rounded-full" />
              <h2 className="text-3xl font-bold text-foreground">أعلى تصنيف أنيمي</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {topRatedAnime.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          </div>
        </section>

        
      </main>

      <Footer />
    </div>
  );
}
