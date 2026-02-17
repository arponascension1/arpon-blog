import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

interface GoogleAdProps {
    className?: string;
    style?: any;
    adClient?: string;
    adSlot: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle';
    fullWidthResponsive?: boolean;
}

const GoogleAd: React.FC<GoogleAdProps> = ({
    className = '',
    style = { display: 'block' },
    adClient,
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
}) => {
    const { settings } = usePage<PageProps>().props;
    const defaultAdClient = adClient || settings?.google_adsense_client_id || '';

    useEffect(() => {
        if (defaultAdClient && adSlot) {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (e) {
                console.error('AdSense error:', e);
            }
        }
    }, [defaultAdClient, adSlot]);

    if (!defaultAdClient || !adSlot) {
        return (
            <div className={`google-ad-container my-8 ${className}`}>
                <div 
                    className="bg-gray-100 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 min-h-[250px] transition-all hover:bg-gray-50 group"
                    style={style}
                >
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
                        <svg className="h-8 w-8 text-gray-300 mb-3 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Advertisement</span>
                        <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest italic">Demo Mode: No Client ID Configured</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`google-ad-container my-8 ${className}`}>
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client={defaultAdClient}
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
            />
        </div>
    );
};

export default GoogleAd;
