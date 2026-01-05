// scripts/test-gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function runDiagnostics() {
  console.log("--- 🔍 STARTING DIAGNOSTICS ---\n");

  // 1. TEST INTERNET CONNECTION
  console.log("1️⃣  Testing Internet Connection...");
  try {
    await fetch("https://www.google.com");
    console.log("   ✅ SUCCESS: Node.js can reach the internet.\n");
  } catch (error) {
    console.log("   ❌ CRITICAL FAILURE: Node.js cannot reach the internet.");
    console.log("      Reason:", error.message);
    console.log(
      "      (If this fails, the API will never work. Turn off VPNs/Firewalls.)\n"
    );
    return;
  }

  // 2. CHECK API KEY
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    console.log("   ❌ ERROR: No API Key found in .env.local");
    return;
  }
  console.log("   ✅ API Key found.\n");

  const genAI = new GoogleGenerativeAI(apiKey);

  // 3. LIST AVAILABLE MODELS
  // This answers your question about "which model from the list"
  console.log("2️⃣  Fetching Available Models for your Key...");
  try {
    // Note: The SDK currently doesn't expose listModels easily in all versions,
    // so we will test the specific model directly instead.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log(
      "   ℹ️  Selected Model: gemini-1.5-flash (This is the correct standard model)\n"
    );

    // 4. TEST GENERATION
    console.log("3️⃣  Testing Generation...");
    const result = await model.generateContent(
      "Explain 'Hello World' in 5 words."
    );
    const response = await result.response;
    const text = response.text();

    console.log("   ✅ SUCCESS! The API is working perfectly.");
    console.log("   🤖 AI Response:", text);
  } catch (error) {
    console.log("   ❌ API ERROR:");
    console.log(
      "      If you see 'fetch failed', your internet is blocking Google."
    );
    console.log(
      "      If you see '404' or '400', the model name or key is wrong."
    );
    console.log("      Error details:", error.message);
  }
  console.log("\n--- 🏁 END DIAGNOSTICS ---");
}

runDiagnostics();
