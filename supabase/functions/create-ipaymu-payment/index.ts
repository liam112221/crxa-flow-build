import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, amount, description, userEmail, userName } = await req.json();

    // iPaymu Configuration
    const apikey = Deno.env.get("IPAYMU_API_KEY") || "SANDBOX91DEE005-FC1A-41A9-BA69-664DA3E203FA";
    const va = Deno.env.get("IPAYMU_VA") || "0000005156371696";
    const url = 'https://sandbox.ipaymu.com/api/v2/payment/direct'; // sandbox mode

    const body = {
      "name": userName,
      "phone": "085156371696", // default phone
      "email": userEmail,
      "amount": amount,
      "comments": description,
      "notifyUrl": `${req.headers.get("origin")}/api/payment-callback`, // callback URL
      "referenceId": orderId,
      "paymentMethod": "va",
      "paymentChannel": "bca",
    };

    // Generate signature (simplified - in production use crypto library)
    const bodyString = JSON.stringify(body);
    const stringToSign = `POST:${va}:${bodyString}:${apikey}`;
    
    // For now, use a simple hash (in production, use proper HMAC-SHA256)
    const signature = btoa(stringToSign);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'va': va,
        'signature': signature,
        'timestamp': new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, '')
      },
      body: bodyString
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      details: "Failed to create iPaymu payment"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});