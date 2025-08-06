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
    const url = new URL(req.url);
    const returnParam = url.searchParams.get('return');
    const sessionId = url.searchParams.get('sid');
    const trxId = url.searchParams.get('trx_id');
    const status = url.searchParams.get('status');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (returnParam === 'true' && status === 'berhasil') {
      // Update order status to waiting for admin approval
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'Menunggu Persetujuan Admin',
          payment_session_id: sessionId,
          payment_trx_id: trxId,
          payment_status: status,
          paid_at: new Date().toISOString()
        })
        .eq('session_id', sessionId);

      if (error) {
        console.error('Database update error:', error);
        throw new Error('Failed to update order status');
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: "Payment callback processed"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Payment callback error:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: "Failed to process payment callback"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});