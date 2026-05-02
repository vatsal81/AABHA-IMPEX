import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { fetchMarketPrices } from '../services/api';
import { Activity, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './NewsTicker.css';

const NewsTicker = () => {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { data: prices = [], isLoading } = useQuery({
        queryKey: ['marketPrices'],
        queryFn: fetchMarketPrices,
        refetchInterval: 60000, 
    });

    const tickerItems = Array.isArray(prices) && prices.length > 0 
        ? [...prices, ...prices] 
        : [
            { id: '1', name: 'Jeera (Unjha)', price: '24,500', change: '+1.2%', type: 'up' },
            { id: '2', name: 'Turmeric', price: '18,200', change: '+0.8%', type: 'up' },
            { id: '3', name: 'Cotton', price: '62,000', change: '-0.5%', type: 'down' }
          ];

    return (
        <div className={`news-ticker-container ${scrolled ? 'scrolled' : ''}`}>
            <div className="ticker-label">
                <Activity size={14} />
                <span>LIVE MARKET</span>
            </div>
            <div className="ticker-wrap">
                <div className="ticker-move">
                    {tickerItems.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="ticker-item">
                            <span className="ticker-name">{item.name}</span>
                            <span className="ticker-price">₹{item.price}</span>
                            <span className={`ticker-change ${item.type}`}>
                                {item.type === 'up' && <TrendingUp size={12} />}
                                {item.type === 'down' && <TrendingDown size={12} />}
                                {item.type === 'neutral' && <Minus size={12} />}
                                {item.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsTicker;
