const Parser = require('rss-parser');
const axios = require('axios');
const parser = new Parser();

/**
 * Elite Global Trade Intelligence Service
 * Analyst-grade filtering: impact scoring, deduplication, region detection
 */
class MarketService {
    constructor() {
        this.sources = [
            // Using Google News RSS as a proxy to bypass Business Standard's bot blocking
            { 
                name: 'Business Standard', 
                url: 'https://news.google.com/rss/search?q=site:business-standard.com+when:1h&hl=en-IN&gl=IN&ceid=IN:en', 
                category: 'Latest' 
            },
            { name: 'Times of India Business', url: 'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms', category: 'Business' },
            { 
                name: 'Times of India Breaking', 
                url: 'https://news.google.com/rss/search?q=site:timesofindia.indiatimes.com+when:1h&hl=en-IN&gl=IN&ceid=IN:en', 
                category: 'Breaking' 
            },
            { name: 'Times of India World', url: 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms', category: 'Global' }
        ];

        // HIGH impact — 3 points each
        this.highImpactKeywords = [
            'hormuz strait', 'red sea', 'war', 'sanctions', 'blockade', 'missile',
            'attack', 'conflict', 'oil prices', 'export ban', 'trade war',
            'tariffs', 'freight surge', 'port strike', 'canal closure', 'geopolitical crisis',
            'trump', 'crisis', 'emergency', 'strike'
        ];

        // MEDIUM impact — 1 point each
        this.tradeKeywords = [
            'trade', 'import', 'export', 'shipping', 'logistics', 'oil',
            'commodities', 'freight', 'supply chain', 'ports', 'cargo',
            'inflation', 'economy', 'market', 'stocks', 'investment',
            'industry', 'growth', 'gdp', 'rbi', 'finance', 'policy',
            'customs', 'duty', 'tariff', 'world', 'india'
        ];

        // EXCLUDED — 0 points, blocked
        this.excludeKeywords = [
            'ipl', 'cricket', 'football', 'entertainment', 'bollywood',
            'movie', 'celebrity', 'sports', 'fashion', 'music', 'oscar',
            'match', 'score', 'batting', 'bowling'
        ];
    }

    _classifyArticle(text) {
        const t = text.toLowerCase();

        // Impact Level calculation
        const highScore = this.highImpactKeywords.filter(k => new RegExp(`\\b${k}\\b`, 'i').test(t)).length * 3;
        const medScore = this.tradeKeywords.filter(k => new RegExp(`\\b${k}\\b`, 'i').test(t)).length;
        const totalScore = highScore + medScore;
        
        let impactLevel = 'Low';
        if (highScore >= 3 || totalScore >= 5) impactLevel = 'High';
        else if (totalScore >= 2) impactLevel = 'Medium';

        // Category Detection
        let category = 'Trade';
        if (/\b(oil|fuel|energy|opec|petroleum|crude)\b/i.test(t)) category = 'Oil';
        else if (/\b(war|conflict|sanction|missile|hormuz|red sea|ukraine|attack|crisis|geopolitical)\b/i.test(t)) category = 'War';
        else if (/\b(shipping|freight|port|cargo|container|canal|vessel|logistics)\b/i.test(t)) category = 'Shipping';
        else if (/\b(commodity|commodities|wheat|rice|grain|metal|gold|copper|iron)\b/i.test(t)) category = 'Commodities';
        else if (/\b(inflation|recession|gdp|economy|cpi)\b/i.test(t)) category = 'Inflation';
        else if (/\b(tariff|tariffs|tax|duty|policy|wto|trump|trade war)\b/i.test(t)) category = 'Policy';

        // Region Detection
        let region = 'Global';
        if (/india|indian|mumbai|delhi/i.test(t)) region = 'India';
        else if (/middle east|iran|hormuz|gulf|saudi|uae/i.test(t)) region = 'Middle East';
        else if (/europe|eu|ukraine|russia/i.test(t)) region = 'Europe';
        else if (/china|asia|pacific/i.test(t)) region = 'Asia';
        else if (/usa|america/i.test(t)) region = 'Americas';

        return { impactLevel, category, region, score: totalScore };
    }

    async getLivePrices() {
        try {
            return [
                { id: 's-cumin', name: 'Cumin Seeds (Jeera)', price: '28,400', change: '+1.25%', type: 'up' },
                { id: 's-cor', name: 'Coriander Seeds', price: '7,850', change: '-0.45%', type: 'down' },
                { id: 's-mus', name: 'Mustard Seeds', price: '5,600', change: '+0.80%', type: 'up' },
                { id: 'sp-tur', name: 'Turmeric (Nizam)', price: '13,200', change: '+4.10%', type: 'up' },
                { id: 'sp-chi', name: 'Red Chilli (Guntur)', price: '19,500', change: '+2.30%', type: 'up' },
                { id: 'f-mango', name: 'Alphonso Mango', price: '2,500/box', change: '+12.0%', type: 'up' },
                { id: 'f-grapes', name: 'Grapes (Exports)', price: '110/kg', change: '+5.20%', type: 'up' },
                { id: 'f-onion', name: 'Onion (Nashik)', price: '2,400', change: '+3.40%', type: 'up' }
            ];
        } catch (error) { return []; }
    }

    async getTradeNews() {
        try {
            const feedPromises = this.sources.map(async (source) => {
                try {
                    const response = await axios.get(source.url, {
                        timeout: 10000,
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
                        }
                    });

                    const feed = await parser.parseString(response.data);
                    const now = new Date();
                    console.log(`- ${source.name}: Fetched ${feed.items.length} raw items`);

                    const filteredItems = feed.items
                        .filter(item => {
                            const text = (item.title + ' ' + (item.contentSnippet || '')).toLowerCase();
                            if (this.excludeKeywords.some(k => text.includes(k))) return false;
                            
                            const hasKeywords = [...this.highImpactKeywords, ...this.tradeKeywords].some(k => text.includes(k));
                            // Be more lenient with Business Standard as it's a dedicated business source
                            if (!hasKeywords && source.name !== 'Business Standard') return false;

                            const pubDate = new Date(item.pubDate);
                            const hoursDiff = (now - pubDate) / (1000 * 60 * 60);
                            return hoursDiff <= 48;
                        })
                        .map(item => {
                            const fullText = item.title + ' ' + (item.contentSnippet || '');
                            const { impactLevel, category, region } = this._classifyArticle(fullText);

                            // Extract image URL
                            let imageUrl = null;
                            if (item.enclosure && item.enclosure.url) imageUrl = item.enclosure.url;
                            else if (item['media:content'] && item['media:content'].$ && item['media:content'].$.url) imageUrl = item['media:content'].$.url;
                            else if (item.content) {
                                const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
                                if (imgMatch) imageUrl = imgMatch[1];
                            }

                            return {
                                title: item.title.trim(),
                                summary: (item.contentSnippet || item.content || '').replace(/<[^>]*>?/gm, '').substring(0, 180).trim() + '...',
                                source: source.name,
                                publishedAt: new Date(item.pubDate).toISOString(),
                                category,
                                impactLevel,
                                region,
                                url: item.link,
                                imageUrl
                            };
                        });
                    
                    console.log(`- ${source.name}: ${filteredItems.length} items passed filters`);
                    return filteredItems;
                } catch (err) {
                    console.error(`Error fetching from ${source.name}:`, err.message);
                    return [];
                }
            });

            const results = await Promise.all(feedPromises);
            let pool = results.flat();

            // Deduplicate by normalized title
            const seen = new Set();
            pool = pool.filter(item => {
                const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
                if (seen.has(key)) return false;
                seen.add(key);
                return true;
            });

            const impactOrder = { High: 3, Medium: 2, Low: 1 };
            // Sort: Absolute Latest first (Strictly Chronological)
            return pool
                .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
                .slice(0, 20);

        } catch (error) {
            console.error('MarketService Error:', error);
            return [];
        }
    }
}

module.exports = new MarketService();


