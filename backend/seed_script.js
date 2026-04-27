const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/aabha_impex';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  longDescription: String,
  image: String,
  specifications: [{ label: String, value: String }],
  benefits: [String],
  packing: String,
  available: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Product.deleteMany({});
    
    const initialProducts = [
        { 
          name: "Cumin Seeds", 
          category: "Seeds", 
          image: "https://images.unsplash.com/photo-1599330231908-09559f214690?auto=format&fit=crop&q=80&w=800", 
          description: "Premium quality Cumin seeds with high purity and strong aroma.",
          longDescription: "Our Cumin seeds (Jeera) are sourced from the finest farms in Gujarat. Available in European, Singapore, and US grades, they are known for their high oil content and distinct flavor profile.",
          specifications: [
              { label: "Purity", value: "99% to 99.5% (Extraneous Matter Max 0.5%)" },
              { label: "Moisture", value: "Max 10%" },
              { label: "Origin", value: "Gujarat, India" }
          ],
          benefits: ["Aids Digestion", "Rich in Iron", "Anti-inflammatory Properties"],
          packing: "25kg, 50kg PP Bags / Jute Bags"
        },
        { 
          name: "White Sesame Seeds", 
          category: "Seeds", 
          image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=800", 
          description: "High purity natural white sesame seeds for global culinary use.",
          longDescription: "We offer premium Natural White Sesame Seeds, cleaned and graded to ensure the highest purity levels. These seeds are perfect for oil extraction, bakery, and confectionery industries.",
          specifications: [
              { label: "Purity", value: "99.95% (Sortex Cleaned)" },
              { label: "Oil Content", value: "Min 48%" },
              { label: "Admixture", value: "Max 0.05%" }
          ],
          benefits: ["High in Protein", "Supports Heart Health", "Rich in Fiber"],
          packing: "25kg, 50kg Multi-wall Paper or PP Bags"
        },
        { 
          name: "Coriander Seeds", 
          category: "Seeds", 
          image: "https://images.unsplash.com/photo-1610398041456-a1ff009e2501?auto=format&fit=crop&q=80&w=800", 
          description: "Whole coriander seeds available in Eagle, Scooter, and Parrot grades.",
          longDescription: "Our Coriander seeds are sourced from Rajasthan and Gujarat. We provide various grades including Eagle Plus and Parrot, characterized by their pleasant aroma and greenish-yellow color.",
          specifications: [
              { label: "Grade", value: "Eagle / Scooter / Parrot" },
              { label: "Moisture", value: "Max 9%" },
              { label: "Split Seeds", value: "Max 5%" }
          ],
          benefits: ["Digestive Aid", "Rich in Antioxidants", "Natural Preservative"],
          packing: "25kg, 40kg Jute or PP Bags"
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
          name: "Organic Red Chilli Powder", 
          category: "Spices", 
          image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800", 
          description: "100% pure and organic red chilli powder sourced directly from farms.",
          longDescription: "Our organic red chilli powder is processed from the finest sun-dried chillies. It is free from artificial colors or additives, ensuring a natural pungency and vibrant red color for your dishes.",
          specifications: [
              { label: "Type", value: "Organic / Pure" },
              { label: "Color Value", value: "60 - 100 ASTA" },
              { label: "Pungency", value: "15,000 - 30,000 SHU" }
          ],
          benefits: ["Metabolism Booster", "Rich in Vitamin C", "Natural Spice"],
          packing: "5kg, 10kg, 25kg Kraft Paper or LDPE Bags"
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
    console.log("Database Seeded Successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
