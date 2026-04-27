const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        await Product.deleteMany({});
        const initialProducts = [
            { 
              name: "Dry Red Chillies", 
              category: "Spices", 
              image: "https://www.umaexports.net/images/dry-red-chillies.png", 
              description: "High-grade dry red chillies from Guntur, Asia's biggest spice yard.",
              longDescription: "Our Dry Red Chillies are sourced directly from Guntur (Andhra Pradesh), the world's leading producer. These chillies are prized for their vibrant color extraction and balanced pungency. They are used globally as a core ingredient in curry powders, spice blends, and even in pharmaceutical applications due to their high enzyme content.",
              specifications: [
                  { label: "Origin", value: "Guntur, Andhra Pradesh" },
                  { label: "Purity", value: "100% Natural" },
                  { label: "Grade", value: "Export Grade (S17, Teja, Sanam)" }
              ],
              benefits: ["Natural Food Colorant", "Rich in Vitamin C", "Metabolism Booster"],
              packing: "5kg, 10kg, 25kg Jute Bags / PP Bags"
            },
            { 
              name: "Turmeric (Haldi)", 
              category: "Spices", 
              image: "https://www.umaexports.net/images/turmeric.jpg", 
              description: "Premium Indian turmeric with high curcumin content.",
              longDescription: "Turmeric is one of the most vital spices globally, used for its distinct color, flavor, and medicinal properties. Our turmeric is sourced from the best growing regions in India, ensuring high curcumin levels. It serves as a principal ingredient in curry powders and is widely used in the textile and cosmetic industries as a natural dye and antiseptic.",
              specifications: [
                  { label: "Type", value: "Finger / Powder" },
                  { label: "Curcumin Content", value: "3% to 5% Min" },
                  { label: "Moisture", value: "Max 10%" }
              ],
              benefits: ["Anti-inflammatory", "Natural Antiseptic", "Blood Purifier"],
              packing: "25kg, 50kg Double Burlap Jute Bags"
            },
            { 
              name: "Coriander Seeds", 
              category: "Spices", 
              image: "https://www.umaexports.net/images/coriander.jpg", 
              description: "Aromatic coriander seeds available in Eagle and Parrot grades.",
              longDescription: "Sourced from the thriving crops of the Indian subcontinent, our coriander seeds are processed under optimal climatic conditions to preserve their essential oils. We offer various grades including Eagle, Scooter, and Parrot, customized to meet specific international culinary and industrial standards.",
              specifications: [
                  { label: "Grade", value: "Eagle / Scooter / Parrot" },
                  { label: "Purity", value: "99% Min" },
                  { label: "Split Seeds", value: "Max 5%" }
              ],
              benefits: ["Aids Digestion", "Rich in Antioxidants", "Pleasant Aroma"],
              packing: "20kg, 25kg, 40kg PP/Jute Bags"
            },
            { 
              name: "Cumin Seeds (Jeera)", 
              category: "Spices", 
              image: "https://www.umaexports.net/images/cumin_seed.jpg", 
              description: "Best quality Indian cumin seeds with long shelf life and intense aroma.",
              longDescription: "We specialize in the export of the highest quality Cumin Seeds (Jeera), primarily sourced from Gujarat and Rajasthan. These seeds are celebrated for their intense aromatic flavor and therapeutic properties. They are a rich source of iron, making them highly beneficial for dietary health globally.",
              specifications: [
                  { label: "Purity", value: "99.5% (Sortex Cleaned)" },
                  { label: "Total Ash", value: "Max 9.5%" },
                  { label: "Acid Insoluble Ash", value: "Max 1.5%" }
              ],
              benefits: ["Rich in Iron", "Supports Digestion", "Boosts Immunity"],
              packing: "25kg, 50kg Multi-wall Paper or PP Bags"
            },
            { 
              name: "White Chickpeas (Kabuli Chana)", 
              category: "Pulses", 
              image: "https://images.unsplash.com/photo-1547050605-2f3062325c88?auto=format&fit=crop&q=80&w=800", 
              description: "Large size premium Garbanzo beans (9mm to 12mm).",
              longDescription: "Aabha Impex exports high-quality White Chickpeas, also known as Kabuli Chana. These are carefully processed and graded by size to meet international culinary requirements.",
              specifications: [
                  { label: "Size", value: "42-44 / 44-46 (9mm to 12mm)" },
                  { label: "Purity", value: "99% Min" },
                  { label: "Moisture", value: "10% - 12% Max" }
              ],
              benefits: ["High Protein Content", "Rich in Fiber", "Versatile Ingredient"],
              packing: "25kg, 50kg PP Bags"
            },
            { 
              name: "Steel Rebar Couplers", 
              category: "Construction", 
              image: "https://images.unsplash.com/photo-1621905252507-b354bcadc441?auto=format&fit=crop&q=80&w=800", 
              description: "High-strength mechanical couplers for reinforcing bar connections.",
              longDescription: "We supply a range of high-quality Steel Metal Rebar Couplers, including threaded, grout-filled, and swaged types. These are designed to provide a continuous reinforcement system in concrete structures.",
              specifications: [
                  { label: "Material", value: "High-grade Carbon Steel" },
                  { label: "Types", value: "Threaded, Grout-filled, Swaged" },
                  { label: "Size Range", value: "16mm to 40mm" }
              ],
              benefits: ["Reduces Rebar Congestion", "Superior Structural Integrity", "Cost-effective"],
              packing: "Standard Industrial Crates / Boxes"
            }
        ];
        await Product.insertMany(initialProducts);
        res.json({ message: "Spice Catalog Updated Successfully from Source" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
