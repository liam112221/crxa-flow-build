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
    const { orderId, amount, description, userEmail, userName, service, budget } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // iPaymu Configuration
    const apikey = Deno.env.get("IPAYMU_API_KEY") || "SANDBOX91DEE005-FC1A-41A9-BA69-664DA3E203FA";
    const va = Deno.env.get("IPAYMU_VA") || "0000005156371696";
    const url = 'https://sandbox.ipaymu.com/api/v2/payment';

    // Create form data for iPaymu API
    const formData = new FormData();
    formData.append('product[]', service);
    formData.append('qty[]', '1');
    formData.append('price[]', amount.toString());
    formData.append('description[]', description);
    formData.append('returnUrl', `${req.headers.get("origin")}/dashboard`);
    formData.append('notifyUrl', `${req.headers.get("origin")}/api/payment-callback`);
    formData.append('cancelUrl', `${req.headers.get("origin")}/order`);
    formData.append('referenceId', orderId);
    formData.append('buyerName', userName);
    formData.append('buyerEmail', userEmail);
    formData.append('buyerPhone', '08123456789');

    // Generate signature for iPaymu
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 14);
    const bodyString = JSON.stringify(Object.fromEntries(formData));
    const stringToSign = `POST:${va}:${bodyString}:${apikey}`;
    const signature = btoa(stringToSign);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'signature': signature,
        'va': va,
        'timestamp': timestamp
      },
      body: formData
    });

    const result = await response.json();
    
    if (result.Status === 200) {
      // Save order to database with payment URL
      const { error: dbError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          service: service,
          description: description,
          budget: budget,
          dp_amount: amount,
          status: 'Menunggu Pembayaran DP',
          payment_url: result.Data.Url,
          session_id: result.Data.SessionID,
          user_email: userEmail,
          user_name: userName,
          created_at: new Date().toISOString()
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to save order to database');
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: "Failed to create iPaymu payment"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});