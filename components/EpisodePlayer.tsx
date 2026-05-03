'use client';

import { useEffect, useState } from 'react';
import axios from "axios"
export interface Episode {
  id: string;
  animeId: number;
}

export interface Server {
  id: string;
  episodeId:number;
  animeId:number;
  serverLink: string;
}

type Props = {
  episode: Episode;
};
import { AlertCircle } from 'lucide-react';


export default function EpisodePlayer({ episode }: Props) {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  const [servers,setServers]=useState<Server[] | null>(null);

  useEffect(() => {
  
      const fetchAnime = async () => {
        try {
          const res = await axios.get(`https://witanime-production.up.railway.app/api/episodes/${episode.id}/servers`);
          setServers(res.data)
          setSelectedServer(res.data[0])
        } catch (err) {
          console.error("Error fetching anime:", err);
        }
      };
  
      fetchAnime();
    }, [episode.id]);


  const [isLoading, setIsLoading] = useState(false);

  const handleServerChange = (server: Server) => {
    setIsLoading(true);
    setSelectedServer(server);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative w-full bg-muted rounded-lg overflow-hidden border border-border/50">
        <div className="aspect-video relative bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="animate-spin">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            </div>
          )}
          
          {selectedServer && (
            <iframe
              src={selectedServer.serverLink}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </div>
      </div>

      {/* Episode Info */}
      <div className="space-y-4">
        

      </div>

      {/* Server Selection */}
      <div className="space-y-4">
        <h2 dir="rtl" className="text-xl font-semibold text-foreground">اختر الخادم</h2>
        
        {servers?.length === 0 ? (
          <div dir="rtl" className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p dir="rtl" className="text-sm text-destructive">
لا توجد خوادم متاحة لهذه الحلقة.
            </p>
          </div>
        ) : (
          <div dir="rtl" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {servers?.map((server,index) => (
              <button
                key={server.id}
                onClick={() => handleServerChange(server)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedServer?.id === server.id
                    ? 'bg-primary text-primary-foreground ring-2 ring-primary/50'
                    : 'bg-card border border-border/50 text-foreground hover:border-primary/50 hover:bg-card'
                }`}
              >
                {`Server ${index+1}`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Server Info */}
      <div className="p-4 bg-card border border-border/50 rounded-lg">
        <p dir="rtl" className="text-sm text-muted-foreground">
          هل تواجه مشاكل؟ حاول التبديل إلى خادم آخر. جميع الخوادم تبث من مصادر خارجية.
        </p>
      </div>
    </div>
  );
}
