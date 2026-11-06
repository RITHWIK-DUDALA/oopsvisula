import React from 'react';
import { ExternalLink, BookOpen, Video, ShieldCheck } from 'lucide-react';

export interface ResourceItem {
  type: 'w3schools' | 'oracle' | 'youtube' | 'spec';
  title: string;
  url: string;
  description: string;
  sourceLabel: string;
}

export interface VerifiedResourceCardProps {
  resources: ResourceItem[];
}

export const VerifiedResourceCard: React.FC<VerifiedResourceCardProps> = ({ resources }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <BookOpen className="w-4 h-4 text-[#075CF5]" />
        <h3 className="text-sm font-bold text-[#17191D]">Verified Authoritative References & Further Reading</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {resources.map((res, idx) => {
          const isYouTube = res.type === 'youtube';

          return (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white border border-[#E5E7EB] hover:border-[#075CF5] hover:shadow-xs rounded-xl flex flex-col justify-between space-y-2.5 transition-all group select-none"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] group-hover:bg-[#EFF6FF] group-hover:text-[#075CF5] transition-colors flex items-center space-x-1">
                    {isYouTube ? (
                      <Video className="w-3 h-3 text-[#DC2626]" />
                    ) : (
                      <ShieldCheck className="w-3 h-3 text-[#075CF5]" />
                    )}
                    <span>{res.sourceLabel}</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#075CF5] transition-colors" />
                </div>

                <h4 className="text-xs font-bold text-[#17191D] group-hover:text-[#075CF5] transition-colors line-clamp-1 pt-1">
                  {res.title}
                </h4>
                <p className="text-[11px] text-[#64748B] line-clamp-2 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <span className="text-[10px] font-mono text-[#075CF5] group-hover:underline flex items-center space-x-1 pt-1">
                <span>Open Documentation</span>
                <span>→</span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
