const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/aabha_impex';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: String,
  longDescription: String,
  image: String,
  specifications: [{ label: String, value: String }],
  benefits: [String],
  packing: String,
  hsCode: String,
  origin: { type: String, default: 'India' },
  loadingPort: { type: String, default: 'Mundra / Pipavav, India' },
  available: { type: Boolean, default: true }
});

const Product = mongoose.model('Product', productSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Product.deleteMany({});
    
    const initialProducts = [
        { 
          name: "Organic Red Chilli Powder", 
          slug: "red-chilli-powder",
          category: "Spices", 
          image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800", 
          description: "100% pure and organic red chilli powder sourced directly from farms.",
          longDescription: "Our organic red chilli powder is processed from the finest sun-dried chillies. It is free from artificial colors or additives, ensuring a natural pungency and vibrant red color for your dishes. We ensure that only the highest quality chillies are selected, stems removed, and then ground to the perfect texture.",
          specifications: [
              { label: "Type", value: "Organic / Pure" },
              { label: "Color Value", value: "60 - 100 ASTA" },
              { label: "Pungency", value: "15,000 - 30,000 SHU" },
              { label: "Form", value: "Fine Powder" }
          ],
          nutrients: [
              { label: "Energy", value: "324 kcal" },
              { label: "Carbohydrates", value: "70g" },
              { label: "Fiber", value: "27g" },
              { label: "Protein", value: "10g" }
          ],
          benefits: ["Metabolism Booster", "Rich in Vitamin C", "Natural Spice"],
          uses: ["Curries and Stews", "Marinades", "Pickles", "Spice Blends"],
          exportDetails: "Available in bulk shipments via Mundra Port. Standard lead time: 15-20 days. Full certificate of analysis provided with every batch.",
          packing: "5kg, 10kg, 25kg Kraft Paper or LDPE Bags",
          hsCode: "090422"
        },
        { 
          name: "Cumin Seeds", 
          slug: "cumin-seeds",
          category: "Seeds", 
          image: "https://images.unsplash.com/photo-1599330231908-09559f214690?auto=format&fit=crop&q=80&w=800", 
          description: "Premium quality Cumin seeds with high purity and strong aroma.",
          longDescription: "Our Cumin seeds (Jeera) are sourced from the finest farms in Gujarat. Available in European, Singapore, and US grades, they are known for their high oil content and distinct flavor profile. Cumin is one of the most popular spices in the world, essential in many cuisines for its warm, earthy flavor.",
          specifications: [
              { label: "Purity", value: "99% to 99.5% (Extraneous Matter Max 0.5%)" },
              { label: "Moisture", value: "Max 10%" },
              { label: "Origin", value: "Gujarat, India" },
              { label: "Admixture", value: "Max 0.5%" }
          ],
          nutrients: [
              { label: "Fat", value: "22g" },
              { label: "Sodium", value: "168mg" },
              { label: "Iron", value: "66mg" },
              { label: "Vitamin B6", value: "25%" }
          ],
          benefits: ["Aids Digestion", "Rich in Iron", "Anti-inflammatory Properties"],
          uses: ["Cooking Oil Infusion", "Bread Toppings", "Meat Rubs", "Ayurvedic Medicine"],
          exportDetails: "Container loads (20ft/40ft) available. Phytosanitary certificate and Fumigation certificate included. Samples available on request.",
          packing: "25kg, 50kg PP Bags / Jute Bags",
          hsCode: "090931"
        },
        { 
          name: "Steel Rebar Couplers", 
          slug: "steel-rebar-couplers",
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
          packing: "Standard Industrial Crates / Boxes",
          hsCode: "730799"
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
