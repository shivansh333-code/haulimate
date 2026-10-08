import { GoogleGenAI } from '@google/genai';

export interface ParsedRegistrationData {
  role?: 'driver' | 'owner';
  name?: string;
  phone?: string;
  experienceYears?: number;
  vehicleType?: string;
  preferredRoutes?: string;
  expectedSalary?: number;
  fleetSize?: number;
  companyName?: string;
  city?: string;
  notes?: string;
}

export interface SaathiMessage {
  sender: 'user' | 'assistant';
  text: string;
  suggestedAction?: {
    label: string;
    actionType: 'navigate' | 'call' | 'whatsapp' | 'quickFill';
    target: string;
  };
}

class AIService {
  private aiClient: GoogleGenAI | null = null;
  private apiKey: string = '';

  constructor() {
    this.apiKey = 
      (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
      (typeof import.meta !== 'undefined' && (import.meta as unknown as { env: Record<string, string> }).env?.VITE_GEMINI_API_KEY) ||
      '';
    
    if (this.apiKey) {
      try {
        this.aiClient = new GoogleGenAI({ apiKey: this.apiKey });
      } catch (err) {
        console.warn('Failed to initialize GoogleGenAI client:', err);
      }
    }
  }

  /**
   * Conversational Assistant: Highway Saathi AI (सारथी एआई)
   * Specifically tailored for Indian commercial truck drivers and transport owners.
   */
  public async askHighwaySaathi(
    userMessage: string,
    history: { role: 'user' | 'model'; text: string }[] = []
  ): Promise<SaathiMessage> {
    const trimmed = userMessage.trim().toLowerCase();

    // Check for direct contact requests immediately
    if (trimmed.includes('whatsapp') || trimmed.includes('व्हाट्सएप') || trimmed.includes('chat')) {
      return {
        sender: 'assistant',
        text: 'आप हमारे आधिकारिक व्हाट्सएप सहायता केंद्र पर सीधे संदेश भेज सकते हैं: **+91 70187 09616**। हमारी टीम 24x7 आपकी सहायता के लिए तैयार है।',
        suggestedAction: {
          label: 'व्हाट्सएप पर चैट करें (+91 70187 09616)',
          actionType: 'whatsapp',
          target: 'https://wa.me/917018709616',
        },
      };
    }

    if (trimmed.includes('call') || trimmed.includes('कॉल') || trimmed.includes('phone') || trimmed.includes('नंबर') || trimmed.includes('helpline')) {
      return {
        sender: 'assistant',
        text: 'हमारी 24x7 राष्ट्रीय हेल्पलाइन है: **+91 85279 77238**। किसी भी इमरजेंसी, ड्राइवर रिप्लेसमेंट या रजिस्ट्रेशन सहायता के लिए अभी कॉल करें।',
        suggestedAction: {
          label: 'हेल्पलाइन पर कॉल करें (+91 85279 77238)',
          actionType: 'call',
          target: 'tel:+918527977238',
        },
      };
    }

    if (this.aiClient && this.apiKey) {
      try {
        const systemPrompt = `You are "सारथी AI" (Saathi AI) — the friendly, respectful highway copilot and registration guide for HauliMate (haulimate.com).
Brand Philosophy: "Driver nahi, Professional."
Key Facts:
- WhatsApp Support Number: 7018709616 (wa.me/917018709616)
- Call Support / Toll-Free Helpline: 8527977238
- Target Audience: Indian commercial heavy vehicle truck drivers, fleet operators, and transport owners.
- Key Feature - Uniformed Drivers: Every HauliMate driver is outfitted in a crisp navy/khaki uniform, RFID/QR smart photo ID badge, safety shoes, and high-visibility night jacket.
  * For Transporters: Guarantees zero gate delays at checkpoints/warehouses, enhanced corporate trust with FMCG/e-commerce clients, 100% breathalyzer tested, replacement under 24 hours.
  * For Drivers: "वर्दी से इज़्ज़त" — dignity and respect from highway traffic police and RTOs; no harassment at check-posts; guaranteed bank salary (1st-5th of every month) with PF/ESI.
- Registration Guidance: Explain that drivers and transporters can register in 2 minutes, or simply speak/type their details for AI auto-fill.
- Tone: Extremely warm, polite, Indian highway colloquial tone ("नमस्ते भाई साहब!", "जय हिन्द!"). Keep answers concise (2 to 4 simple lines or bullet points) in Hinglish or simple Hindi/English according to user's question.`;

        const response = await this.aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `${systemPrompt}\n\nUser Question: ${userMessage}`,
        });

        const replyText = response.text || '';
        if (replyText) {
          // Detect appropriate action
          let action: SaathiMessage['suggestedAction'] = undefined;
          if (trimmed.includes('register') || trimmed.includes('रजिस्टर') || trimmed.includes('शुरू') || trimmed.includes('join')) {
            action = {
              label: 'रजिस्ट्रेशन फॉर्म खोलें (Register Now)',
              actionType: 'navigate',
              target: '/register',
            };
          } else if (trimmed.includes('driver') || trimmed.includes('ड्राइवर') || trimmed.includes('नौकरी')) {
            action = {
              label: 'ड्राइवर योजनाएं देखें',
              actionType: 'navigate',
              target: '/for-drivers',
            };
          } else if (trimmed.includes('transporter') || trimmed.includes('गाड़ी') || trimmed.includes('मालिक')) {
            action = {
              label: 'ट्रांसपोर्टर सुविधाएं देखें',
              actionType: 'navigate',
              target: '/for-transporters',
            };
          }

          return {
            sender: 'assistant',
            text: replyText,
            suggestedAction: action,
          };
        }
      } catch (err) {
        console.warn('Gemini generateContent error, falling back to local intelligence:', err);
      }
    }

    // Local Domain Fallbacks for common inquiries (works 100% offline & without API keys)
    if (trimmed.includes('register') || trimmed.includes('रजिस्टर') || trimmed.includes('form') || trimmed.includes('फॉर्म')) {
      return {
        sender: 'assistant',
        text: 'नमस्ते! HauliMate पर रजिस्ट्रेशन बहुत आसान है:\n1. अपना मोबाइल नंबर दर्ज करें\n2. OTP से वेरीफाई करें\n3. ड्राइविंग लाइसेंस और अनुभव बताएं\n\nआप हमारे AI वॉयस ऑटो-फिल का उपयोग करके बस 1 लाइन बोलकर भी पूरा फॉर्म भर सकते हैं!',
        suggestedAction: {
          label: 'तुरंत रजिस्टर करें (/register)',
          actionType: 'navigate',
          target: '/register',
        },
      };
    }

    if (trimmed.includes('uniform') || trimmed.includes('वर्दी') || trimmed.includes('कपड़े') || trimmed.includes('dress') || trimmed.includes('id')) {
      return {
        sender: 'assistant',
        text: 'HauliMate की सबसे बड़ी पहचान है हमारे **यूनिफ़ॉर्मड ट्रक ड्राइवर्स**:\n• **ट्रांसपोर्टर्स के लिए फायदा:** वेयरहाउस और टोल चेकपोस्ट पर बिना रुकावट सीधी एंट्री, कॉर्पोरेट ग्राहकों का 100% भरोसा।\n• **ड्राइवर्स के लिए फायदा:** वर्दी और स्मार्ट क्यूआर आईडी कार्ड से हाईवे पर पुलिस व आरटीओ से पूरा सम्मान ("वर्दी से इज़्ज़त")।\n• हर वेरीफाइड ड्राइवर को 2 सेट मजबूत वर्दी और सेफ्टी जूते मुफ्त दिए जाते हैं।',
        suggestedAction: {
          label: 'यूनिफॉर्म व आईडी विवरण देखें',
          actionType: 'navigate',
          target: '/how-it-works',
        },
      };
    }

    if (trimmed.includes('salary') || trimmed.includes('वेतन') || trimmed.includes('कमाई') || trimmed.includes('रुपये') || trimmed.includes('पैसे')) {
      return {
        sender: 'assistant',
        text: 'HauliMate पर ड्राइवर्स को सम्मानजनक वेतन मिलता है:\n• हर महीने की 1 से 5 तारीख के बीच सीधे बैंक खाते में भुगतान\n• 10-व्हीलर / कंटेनर: ₹28,000 – ₹36,000 + ट्रिप भत्ता\n• 14 से 22 व्हीलर ट्रेलर: ₹35,000 – ₹45,000 + माइलेज बोनस\n• पीएफ/ईएसआई और ₹5 लाख तक का दुर्घटना बीमा कवर शामिल।',
        suggestedAction: {
          label: 'ड्राइवर वेतन तालिका देखें',
          actionType: 'navigate',
          target: '/for-drivers',
        },
      };
    }

    if (trimmed.includes('transporter') || trimmed.includes('गाड़ी') || trimmed.includes('मालिक') || trimmed.includes('फ्लीट')) {
      return {
        sender: 'assistant',
        text: 'ट्रांसपोर्टर्स के लिए HauliMate के मुख्य लाभ:\n1. आरटीओ व पुलिस वेरीफाइड, प्रशिक्षित और यूनिफ़ॉर्मड ड्राइवर्स\n2. ड्राइवर की अनुपस्थिति में 24 घंटे के भीतर स्टैंडबाय रिप्लेसमेंट गारंटी\n3. 0% कमीशन बिचौलिया, सीधे पारदर्शी बिलिंग\n4. सहायता के लिए WhatsApp: **7018709616**, Call: **8527977238**',
        suggestedAction: {
          label: 'ड्राइवर की मांग दर्ज करें',
          actionType: 'navigate',
          target: '/for-transporters',
        },
      };
    }

    return {
      sender: 'assistant',
      text: 'नमस्ते! मैं आपका **सारथी AI** हूँ। आप मुझसे रजिस्ट्रेशन, यूनिफ़ॉर्मड ड्राइवर्स, वेतन या ट्रांसपोर्टर सेवाओं के बारे में कुछ भी पूछ सकते हैं।\n\nतत्काल सहायता के लिए:\n• व्हाट्सएप: **+91 70187 09616**\n• हेल्पलाइन: **+91 85279 77238**',
      suggestedAction: {
        label: 'व्हाट्सएप पर संपर्क करें',
        actionType: 'whatsapp',
        target: 'https://wa.me/917018709616',
      },
    };
  }

  /**
   * AI Voice / Natural Language Form Extraction for Laymen
   * Allows laymen to speak or type casual Hinglish/Hindi/English sentences:
   * e.g., "Mera naam Gurpreet Singh hai, ph 7018709616, 12 saal se trailer chala raha hu, Ludhiana to Mumbai"
   */
  public async autoFillRegistrationWithAI(input: string, role: 'driver' | 'owner'): Promise<ParsedRegistrationData> {
    if (this.aiClient && this.apiKey) {
      try {
        const prompt = `Extract commercial trucking registration details from this user input into JSON:
Input: "${input}"
Target role: "${role}"

Return ONLY a JSON object (no markdown, no backticks) with any of these fields that you can extract or infer:
{
  "name": string,
  "phone": string (10 digits),
  "experienceYears": number,
  "vehicleType": string (e.g. "Trailer (14+ Wheeler)", "Multi-Axle Container", "10-Wheeler Rigid", "Mini Commercial"),
  "preferredRoutes": string (e.g. "Delhi - Mumbai Corridor"),
  "expectedSalary": number,
  "companyName": string,
  "fleetSize": number,
  "city": string,
  "notes": string
}`;

        const res = await this.aiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        const raw = (res.text || '').trim();
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return { role, ...parsed };
        }
      } catch (err) {
        console.warn('AI form autofill error, using regex rule fallback:', err);
      }
    }

    // High quality heuristic extraction for offline / fallback
    const result: ParsedRegistrationData = { role };
    
    // Extract 10-digit phone number
    const phoneMatch = input.match(/(?:\+91|91)?[ -]?([6-9]\d{9})/);
    if (phoneMatch) {
      result.phone = phoneMatch[1];
    }

    // Extract experience (e.g. "8 saal", "10 years", "5 yr")
    const expMatch = input.match(/(\d{1,2})\s*(?:saal|sal|years|yrs|varsh|साल)/i);
    if (expMatch) {
      result.experienceYears = parseInt(expMatch[1], 10);
    }

    // Extract vehicle type
    if (/trailer|ट्रेलर|22 wheeler|18 wheeler/i.test(input)) {
      result.vehicleType = 'Trailer (14+ Wheeler)';
    } else if (/container|कंटेनर|multi[- ]axle/i.test(input)) {
      result.vehicleType = 'Multi-Axle Container (10-14 Wheeler)';
    } else if (/10 wheeler|10 चक्का|12 wheeler/i.test(input)) {
      result.vehicleType = '10-Wheeler Rigid Commercial';
    } else if (/tipper|टिपर|dumper/i.test(input)) {
      result.vehicleType = 'Tipper / Construction Dump Truck';
    } else if (/tanker|टैंकर|petrol/i.test(input)) {
      result.vehicleType = 'Petroleum / Chemical Tanker';
    }

    // Extract name
    const nameMatch = input.match(/(?:naam|name|mera naam|naam hai|my name is)\s+([A-Za-z\u0900-\u097F]+(?:\s+[A-Za-z\u0900-\u097F]+)?)/i);
    if (nameMatch) {
      result.name = nameMatch[1].trim();
    } else {
      // Default common Indian names if mentioned
      if (/gurpreet/i.test(input)) result.name = 'Gurpreet Singh';
      else if (/ramesh/i.test(input)) result.name = 'Ramesh Kumar';
      else if (/suresh/i.test(input)) result.name = 'Suresh Yadav';
      else if (/rajesh/i.test(input)) result.name = 'Rajesh Sharma';
    }

    // Extract routes
    if (/delhi|mumbai|ludhiana|jaipur|kolkata|chennai|ahmedabad/i.test(input)) {
      const cities = input.match(/delhi|mumbai|ludhiana|jaipur|kolkata|chennai|ahmedabad|pune|nagpur/gi);
      if (cities) {
        result.preferredRoutes = cities.join(' ↔ ');
      }
    }

    // Expected salary or fleet size
    const salMatch = input.match(/(\d{2,5})000/);
    if (salMatch && role === 'driver') {
      result.expectedSalary = parseInt(salMatch[0], 10);
    }
    const fleetMatch = input.match(/(\d{1,3})\s*(?:truck|gaadi|vehicles|गाड़ी|ट्रक)/i);
    if (fleetMatch && role === 'owner') {
      result.fleetSize = parseInt(fleetMatch[1], 10);
    }

    return result;
  }
}

export const aiService = new AIService();
