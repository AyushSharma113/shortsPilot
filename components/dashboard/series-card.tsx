"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { 
  MoreVertical, 
  Edit, 
  Play, 
  Pause, 
  Trash, 
  Film, 
  Wand2,
  CalendarDays,
  Activity,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SeriesCardProps {
  series: {
    id: string;
    series_name: string;
    created_at: string;
    video_style_id: string;
    status?: string;
  };
}

export function SeriesCard({ series }: SeriesCardProps) {
  const [status, setStatus] = useState(series.status || 'active');
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleStatus = async () => {
    try {
      setIsUpdating(true);
      const newStatus = status === 'active' ? 'paused' : 'active';
      
      const response = await fetch(`/api/series/${series.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const thumbnailPath = `/video_style/${series.video_style_id}.png`;
  
  // Format date safely
  const dateFormatted = series.created_at 
    ? new Date(series.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : "Recently";

  return (
    <Card className="overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      {/* Thumbnail Section */}
      <div className="relative aspect-video w-full bg-muted">
        <Image
          src={thumbnailPath}
          alt={series.series_name}
          fill
          className="object-cover"
        />
        
        {/* Gradient overlay to make text/icons readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Edit Button on Top Right of Thumbnail */}
        <div className="absolute top-2 right-2 z-10">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-0" asChild>
            <Link href={`/create/${series.id}`}>
                <Edit className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between space-y-0 relative">
        <div className="space-y-1 pr-6">
          <h3 className="font-semibold text-lg line-clamp-1" title={series.series_name}>
            {series.series_name}
          </h3>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
             <CalendarDays className="h-3 w-3" />
             Created {dateFormatted}
          </p>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge 
            variant={status === 'active' ? 'default' : 'secondary'} 
            className="capitalize shadow-sm font-medium"
          >
            {status === 'active' ? <Activity className="w-3 h-3 mr-1 animate-pulse" /> : <Pause className="w-3 h-3 mr-1" />}
            {status}
          </Badge>
        </div>

        {/* Dropdown Menu */}
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 shadow-sm" disabled={isUpdating}>
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreVertical className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href={`/create/${series.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Series
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={toggleStatus}>
                {status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Series
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume Series
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1">
        {/* We can add quick stats here later if needed */}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2 w-full mt-auto">
        <Button variant="outline" className="flex-1 text-xs" size="sm">
          <Film className="h-3.5 w-3.5 mr-1" />
          View Videos
        </Button>
        <Button className="flex-1 text-xs" size="sm">
          <Wand2 className="h-3.5 w-3.5 mr-1" />
          Generate
        </Button>
      </CardFooter>
    </Card>
  );
}
