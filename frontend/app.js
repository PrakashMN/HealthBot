// Global variables
        let currentLanguage = `en`;
        let chatHistory = [];
        let messageCount = 0;
    let soundEnabled = true;
    // shared AudioContext so we can resume/unlock it on user gesture (toggle)
    let audioContext = null;
        let isTyping = false;

        // Language translations
        const translations = {
            en: {
                greeting: `Hello! 👋 I'm your AI health assistant. I can help you with symptoms, vaccination schedules, preventive care, and emergency guidance. How can I assist you today?`,
                symptoms: `I can help you check your symptoms. Please describe what you're experiencing, and I'll provide guidance based on medical knowledge.`,
                vaccine: `I can provide vaccination information for all age groups. What specific vaccination information do you need?`,
                prevention: `I'll share important preventive healthcare tips to help you stay healthy. What area would you like to focus on?`,
                emergency: `This appears to be an emergency situation. I'm providing immediate guidance and emergency contacts.`
            },
            hi: {
                greeting: `नमस्ते! 👋 मैं आपका AI स्वास्थ्य सहायक हूं। मैं लक्षणों, टीकाकरण कार्यक्रम, निवारक देखभाल और आपातकालीन मार्गदर्शन में आपकी सहायता कर सकता हूं। आज मैं आपकी कैसे मदद कर सकता हूं?`,
                symptoms: `मैं आपके लक्षणों की जांच में मदद कर सकता हूं। कृपया बताएं कि आप क्या महसूस कर रहे हैं, और मैं चिकित्सा ज्ञान के आधार पर मार्गदर्शन प्रदान करूंगा।`,
                vaccine: `मैं सभी आयु समूहों के लिए टीकाकरण की जानकारी प्रदान कर सकता हूं। आपको किस विशिष्ट टीकाकरण जानकारी की आवश्यकता है?`,
                prevention: `मैं आपको स्वस्थ रहने में मदद करने के लिए महत्वपूर्ण निवारक स्वास्थ्य सुझाव साझा करूंगा। आप किस क्षेत्र पर ध्यान देना चाहते हैं?`,
                emergency: `यह एक आपातकालीन स्थिति प्रतीत होती है। मैं तत्काल मार्गदर्शन और आपातकालीन संपर्क प्रदान कर रहा हूं।`
            },
            bn: {
                greeting: `হ্যালো! 👋 আমি আপনার AI স্বাস্থ্য সহায়ক। আমি উপসর্গ, টিকাদান সূची, প্রতিরোধমূলক যত্ন এবং জরুরি নির্দেশনায় আপনাকে সাহায্য করতে পারি। আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?`,
                symptoms: `আমি আপনার উপসর্গ পরীক্ষা করতে সাহায্য করতে পারি। আপনি কী অনুভব করছেন তা বর্ণনা করুন, এবং আমি চিকিৎসা জ্ঞানের ভিত্তিতে নির্দেশনা প্রদান করব।`,
                vaccine: `আমি সব বয়সের জন্য টিকাদানের তথ্য প্রদান করতে পারি। আপনার কোন নির্দিষ্ট টিকাদানের তথ্য প্রয়োজন?`,
                prevention: `আমি আপনাকে সুস্থ থাকতে সাহায্য করার জন্য গুরুত্বপূর্ণ প্রতিরোধমূলক স্বাস্থ্যসেবা টিপস শেয়ার করব। আপনি কোন ক্ষেত্রে মনোযোগ দিতে চান?`,
                emergency: `এটি একটি জরুরি পরিস্থিতি বলে মনে হচ্ছে। আমি তাৎক্ষণিক নির্দেশনা এবং জরুরি যোগাযোগ প্রদান করছি।`
            },
            kn: {
                greeting: `ನಮಸ್ಕಾರ! 👋 ನಾನು ನಿಮ್ಮ AI ಆರೋಗ್ಯ ಸಹಾಯಕನು. ಲಕ್ಷಣಗಳು, ಲಸಿಕೆ ವೇಳಾಪಟ್ಟಿ, ತಡೆಗಟ್ಟುವ ಆರೈಕೆ ಮತ್ತು ತುರ್ತು ಮಾರ್ಗದರ್ಶನದಲ್ಲಿ ನಾನು ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`,
                symptoms: `ನಾನು ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ದಯವಿಟ್ಟು ನೀವು ಅನುಭವಿಸುತ್ತಿರುವುದನ್ನು ವಿವರಿಸಿ; ವೈದ್ಯಕೀಯ ಜ್ಞಾನದ ಆಧಾರದ ಮೇಲೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇನೆ.`,
                vaccine: `ಎಲ್ಲ ವಯಸ್ಸಿನವರಿಗೂ ಲಸಿಕೆ ಮಾಹಿತಿಯನ್ನು ನೀಡಬಲ್ಲೆ. ನಿಮಗೆ ಯಾವ ವಿಶೇಷ ಲಸಿಕೆ ಮಾಹಿತಿಯ ಅಗತ್ಯವಿದೆ?`,
                prevention: `ಆರೋಗ್ಯವಾಗಿರಲು ಮಹತ್ವದ ತಡೆಗಟ್ಟುವ ಆರೋಗ್ಯ ಸಲಹೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತೇನೆ. ನೀವು ಯಾವ ವಿಷಯದ ಮೇಲೆ ಗಮನಹರಿಸಲು ಬಯಸುತ್ತೀರಿ?`,
                emergency: `ಇದು ತುರ್ತು ಪರಿಸ್ಥಿತಿ ಎಂದು ಕಾಣುತ್ತದೆ. ತಕ್ಷಣದ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ತುರ್ತು ಸಂಪರ್ಕಗಳನ್ನು ನೀಡುತ್ತಿರುವೆ.`
            },
            or: {
                greeting: `ନମସ୍କାର! 👋 ମୁଁ ଆପଣଙ୍କ AI ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ଲକ୍ଷଣ, ଟୀକାକରଣ ସୂଚୀ, ପ୍ରତିରୋଧକ ଯତ୍ନ ଏବଂ ଆପତ୍କାଳୀନ ମର୍ଗଦର୍ଶନରେ ମୁଁ ସାହାୟ୍ୟ କରିପାରିବି। ଆଜି ମୁଁ କିପରି ସାହାୟ୍ୟ କରିପାରିବି?`,
                symptoms: `ମୁଁ ଆପଣଙ୍କ ଲକ୍ଷଣ ଯାଞ୍ଚ କରିବାରେ ସାହାୟ୍ୟ କରିପାରିବି। ଦୟାକରି ଆପଣ କ’ଣ ଅନୁଭବୁଛନ୍ତି ଲେଖନ୍ତୁ; ଚିକିତ୍ସା ଜ୍ଞାନ ଆଧାରରେ ମୁଁ ପରାମର୍ଶ ଦେବି।`,
                vaccine: `ସମସ୍ତ ବୟସର ଲୋକଙ୍କ ପାଇଁ ଟୀକାକରଣ ସମ୍ବନ୍ଧୀୟ ସୂଚନା ଦେଇପାରିବି। କେଉଁ ବିଶେଷ ଟୀକା ବିଷୟରେ ଆପଣ ଜାଣିବାକୁ ଚାହୁଁଛନ୍ତି?`,
                prevention: `ସୁସ୍ଥ ରହିବା ପାଇଁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପ୍ରତିରୋଧକ ସ୍ୱାସ୍ଥ୍ୟ ସଳହ ଦେବି। ଆପଣ କେଉଁ କ୍ଷେତ୍ରରେ ଧ୍ୟାନ ଦେବାକୁ ଇଚ୍ଛା କରୁଛନ୍ତି?`,
                emergency: `ଏହା ଆପତ୍କାଳୀନ ପରିସ୍ଥିତି ଭଳି ଲାଗୁଛି। ମୁଁ ତତ୍କ୍ଷଣାତ୍ ମର୍ଗଦର୍ଶନ ଏବଂ ଆପତ୍କାଳୀନ ଯୋଗାଯୋଗ ସଂଖ୍ୟା ଦେଉଛି।`
            },
            /* removed unused language blocks (ta, te) to reduce bundle size */
        };

        // Comprehensive health responses database
        const healthResponses = {
            symptoms: {
                fever: {
                    keywords: [`fever`, `temperature`, `hot`, `chills`, `burning`],
                    response: `🌡️ **Fever Assessment**

Based on your fever symptoms, here's what I recommend:

**Immediate Care:**
• Monitor temperature every 2-4 hours
• Stay hydrated - drink plenty of fluids
• Rest in a cool, comfortable environment
• Use cool compresses on forehead/wrists

**When to Seek Medical Care:**
🚨 **Urgent** - Temperature above 103°F (39.4°C)
🚨 **Urgent** - Fever with severe headache, neck stiffness, or confusion
⚠️ **Soon** - Fever lasting more than 3 days
⚠️ **Soon** - Difficulty breathing or chest pain

**Home Remedies:**
• Acetaminophen or ibuprofen as directed
• Light, breathable clothing
• Lukewarm baths (not cold)

**Confidence Level:** 88% | **Severity:** Monitor closely

Would you like specific guidance based on your age or additional symptoms?`
                },
                cough: {
                    keywords: [`cough`, `coughing`, `phlegm`, `mucus`, `throat`],
                    response: `🫁 **Cough Analysis**

I can help assess your cough symptoms:

**Cough Type Assessment:**
• **Dry cough** - Often viral, allergies, or irritation
• **Productive cough** - May indicate bacterial infection
• **Persistent cough** - Could be chronic condition

**Immediate Relief:**
• Honey (1-2 tsp) - natural cough suppressant
• Warm salt water gargle (1/2 tsp salt in warm water)
• Stay hydrated - warm liquids preferred
• Humidify your environment

**Red Flags - Seek Medical Care:**
🚨 **Urgent** - Coughing up blood
🚨 **Urgent** - Severe difficulty breathing
⚠️ **Soon** - Cough with high fever (>101°F)
⚠️ **Soon** - Persistent cough >2 weeks

**Natural Remedies:**
• Ginger tea with honey
• Steam inhalation (10-15 minutes)
• Elevate head while sleeping

**Confidence Level:** 85% | **Duration:** Usually 7-14 days

Do you have any additional symptoms like fever, chest pain, or difficulty breathing?`
                },
                headache: {
                    keywords: [`headache`, `head pain`, `migraine`, `head hurt`],
                    response: `🧠 **Headache Assessment**

Let me help you understand your headache:

**Common Types:**
• **Tension headache** - Band-like pressure, stress-related
• **Migraine** - Throbbing, often one-sided, light sensitivity
• **Sinus headache** - Pressure around eyes/forehead
• **Cluster headache** - Severe, around one eye

**Immediate Relief:**
• Apply cold compress to forehead (15-20 min)
• Rest in dark, quiet room
• Gentle neck/shoulder massage
• Stay hydrated

**Prevention Tips:**
• Regular sleep schedule (7-9 hours)
• Manage stress levels
• Avoid trigger foods (chocolate, aged cheese, MSG)
• Regular meals - don't skip

**Seek Medical Care If:**
🚨 **Emergency** - Sudden, severe "thunderclap" headache
🚨 **Emergency** - Headache with fever, neck stiffness, confusion
⚠️ **Soon** - Headaches becoming more frequent/severe
⚠️ **Soon** - Headache after head injury

**Confidence Level:** 82% | **Relief Time:** 30 minutes - 4 hours

Are there any specific triggers you've noticed, or is this a new type of headache for you?`
                },
                stomach: {
                    keywords: [`stomach`, `abdominal`, `belly`, `nausea`, `vomiting`, `diarrhea`],
                    response: `🤢 **Digestive Issue Assessment**

I'll help you with your stomach concerns:

**Common Causes:**
• Food poisoning or contamination
• Viral gastroenteritis ("stomach flu")
• Stress or anxiety
• Dietary indiscretion

**Immediate Care:**
• **BRAT diet** - Bananas, Rice, Applesauce, Toast
• Clear fluids - water, clear broths, electrolyte solutions
• Avoid dairy, fatty, or spicy foods
• Small, frequent meals

**Hydration is Key:**
• Sip fluids slowly if vomiting
• Oral rehydration salts if available
• Coconut water (natural electrolytes)

**Red Flags - Seek Medical Care:**
🚨 **Emergency** - Severe dehydration (dizziness, no urination)
🚨 **Emergency** - Blood in vomit or stool
🚨 **Emergency** - Severe abdominal pain
⚠️ **Soon** - Persistent vomiting >24 hours
⚠️ **Soon** - High fever with stomach symptoms

**Recovery Timeline:**
• Mild cases: 1-3 days
• Viral gastroenteritis: 3-7 days

**Confidence Level:** 87% | **Severity:** Usually self-limiting

Can you tell me more about when symptoms started and any recent food or travel history?`
                }
            },
            vaccination: {
                child: {
                    keywords: [`child`, `baby`, `infant`, `kid`, `pediatric`],
                    response: `👶 **Pediatric Vaccination Schedule**

Here's the recommended vaccination timeline for children:

**Birth - 2 months:**
• **Birth:** Hepatitis B (1st dose), BCG
• **6 weeks:** DPT (1st), Polio (1st), Hib (1st), Hepatitis B (2nd)
• **10 weeks:** DPT (2nd), Polio (2nd), Hib (2nd)

**14 weeks - 15 months:**
• **14 weeks:** DPT (3rd), Polio (3rd), Hib (3rd)
• **9 months:** Measles (1st dose)
• **15 months:** MMR, Varicella (Chickenpox)

**18 months - 5 years:**
• **18 months:** DPT booster, Polio booster
• **2 years:** Typhoid (if recommended)
• **5 years:** DPT booster, MMR booster

**Important Reminders:**
📅 **Track due dates** - Set calendar reminders
🏥 **Maintain records** - Keep vaccination card safe
⚠️ **Side effects** - Mild fever/soreness is normal
🚨 **Delayed vaccines** - Catch up as soon as possible

**Optional but Recommended:**
• Pneumococcal vaccine
• Rotavirus vaccine
• Hepatitis A

**Next Steps:**
Would you like me to calculate specific due dates based on your child's birth date, or do you have questions about side effects?`
                },
                adult: {
                    keywords: [`adult`, `grown up`, `elderly`, `senior`],
                    response: `👨‍⚕️ **Adult Vaccination Guidelines**

Essential vaccines for adults:

**Routine Adult Vaccines:**
• **Tetanus-Diphtheria (Td)** - Every 10 years
• **Influenza** - Annually (especially Oct-Dec)
• **COVID-19** - As recommended by health authorities

**Age-Specific Recommendations:**

**19-49 years:**
• HPV (if not previously vaccinated)
• Hepatitis B (if risk factors)
• Meningococcal (college students, military)

**50+ years:**
• **Shingles (Zoster)** - One-time at age 50+
• **Pneumonia** - At age 65 or if chronic conditions

**65+ years:**
• **Pneumococcal** - Two different types
• **High-dose flu vaccine** - Better protection

**Special Situations:**
🧳 **Travel vaccines** - Hepatitis A/B, Typhoid, Yellow Fever
🤰 **Pregnancy** - Tdap during each pregnancy
🏥 **Healthcare workers** - Hepatitis B, MMR, Varicella
💊 **Chronic conditions** - Additional vaccines may be needed

**Vaccine Safety:**
• Side effects usually mild (soreness, low fever)
• Serious reactions are very rare
• Benefits far outweigh risks

Which specific vaccines are you interested in, or do you have particular health conditions I should consider?`
                },
                travel: {
                    keywords: [`travel`, `trip`, `vacation`, `abroad`, `international`],
                    response: `✈️ **Travel Vaccination Guide**

Plan your travel vaccines 4-6 weeks before departure:

**Universal Travel Vaccines:**
• **Hepatitis A** - Food/water contamination risk
• **Typhoid** - Poor sanitation areas
• **Routine vaccines** - Ensure up to date (MMR, Tdap, flu)

**Destination-Specific Vaccines:**

**Southeast Asia:**
• Japanese Encephalitis (rural areas)
• Hepatitis B (if extended stay)
• Rabies (if animal exposure risk)

**Africa:**
• **Yellow Fever** - Required for many countries
• Meningococcal (sub-Saharan Africa)
• Malaria prevention (medication, not vaccine)

**South America:**
• Yellow Fever (Amazon basin)
• Hepatitis A & B
• Typhoid

**Europe/North America:**
• Usually just routine vaccines
• Tick-borne encephalitis (certain regions)

**Pre-Travel Checklist:**
📋 **4-6 weeks before:** Consult travel medicine clinic
💉 **Vaccination records:** Carry international certificate
💊 **Medications:** Anti-malarial if needed
🩹 **Travel kit:** Basic medical supplies

**Entry Requirements:**
Some countries require proof of Yellow Fever vaccination for entry.

**Cost Considerations:**
Travel vaccines can be expensive but prevent serious illness.

Where are you planning to travel, and what type of activities will you be doing?`
                }
            },
            prevention: {
                // Trimmed general tips to keep bundle size small; expand later if needed
                general: [
                    `🧼 Wash hands frequently with soap for 20+ seconds`,
                    `😷 Wear masks in crowded indoor spaces and ensure good ventilation`,
                    `💧 Stay hydrated and rest when ill; seek care for severe symptoms`
                ],
                seasonal: {
                    monsoon: `🌧️ **Monsoon Health Protection**

**Water-borne Disease Prevention:**
• Drink only boiled/bottled water
• Avoid ice cubes from unknown sources
• Wash fruits/vegetables thoroughly
• Avoid street food during heavy rains

**Vector-borne Disease Prevention:**
• Eliminate standing water (dengue, malaria prevention)
• Use mosquito nets and repellents
• Wear long sleeves during dawn/dusk
• Keep surroundings clean and dry

**Skin and Foot Care:**
• Keep feet dry, change wet socks immediately
• Use antifungal powder in shoes
• Avoid walking in flood water
• Treat cuts/wounds immediately

**Respiratory Health:**
• Dry clothes completely before wearing
• Ensure good ventilation at home
• Use air purifiers if possible
• Watch for mold growth`,

                    summer: `☀️ **Summer Health Guidelines**

**Heat-Related Illness Prevention:**
• Stay hydrated - drink before feeling thirsty
• Avoid peak sun hours (10 AM - 4 PM)
• Wear light-colored, loose-fitting clothes
• Take frequent breaks in shade/AC

**Food Safety:**
• Refrigerate perishables quickly
• Avoid foods left out >2 hours (1 hour if >90°F)
• Be cautious with dairy products
• Wash hands frequently when handling food

**Skin Protection:**
• Apply sunscreen 30 minutes before going out
• Reapply every 2 hours, more if swimming/sweating
• Wear wide-brimmed hats and sunglasses
• Stay in shade when possible`,

                    winter: `❄️ **Winter Wellness Strategy**

**Immune System Support:**
• Get adequate Vitamin D (supplements if needed)
• Maintain exercise routine indoors
• Eat warming, nutritious foods
• Consider flu vaccination

**Respiratory Health:**
• Use humidifiers to combat dry air
• Stay warm but don't overheat indoors
• Avoid sudden temperature changes
• Practice good cough/sneeze etiquette

**Mental Health:**
• Combat seasonal depression with light therapy
• Maintain social connections
• Continue outdoor activities when possible
• Seek professional help if needed`
                }
            },
            emergency: `🚨 **EMERGENCY HEALTH PROTOCOLS** 🚨

**IMMEDIATE ACTION REQUIRED**

**Emergency Numbers (India):**
📞 **National Emergency:** 112
🚑 **Ambulance:** 108
🏥 **Medical Emergency:** 102
👮‍♂️ **Police:** 100
🔥 **Fire:** 101

**CRITICAL SYMPTOMS - CALL 108 NOW:**
🫀 **Heart Attack Signs:**
• Chest pain/pressure (>5 minutes)
• Pain radiating to arm, jaw, back
• Shortness of breath, nausea, sweating

🧠 **Stroke Signs (FAST):**
• **F**ace drooping
• **A**rm weakness  
• **S**peech difficulty
• **T**ime to call emergency

🫁 **Breathing Emergency:**
• Severe difficulty breathing
• Choking (cannot speak/cough)
• Blue lips or fingernails

🩸 **Severe Bleeding:**
• Apply direct pressure with clean cloth
• Elevate wound above heart level
• Don't remove embedded objects

**POISON EMERGENCY:**
☎️ **Poison Control:** 1066
• Don't induce vomiting unless instructed
• Bring poison container to hospital
• Note time of ingestion

**WHILE WAITING FOR HELP:**
1. Stay calm and keep patient calm
2. Monitor breathing and consciousness
3. Don't give food/water unless instructed
4. Gather medical history/medications
5. Clear pathway for emergency responders

**LOCATION SERVICES:**
📍 Enable location sharing with emergency services
🏥 Know nearest hospital route
👨‍⚕️ Keep emergency contacts readily available

**This is a medical emergency. Professional help is required immediately.**`
        };

        // AI-powered health response generation
        async function generateHealthResponse(message) {
            try {
                console.log('Attempting to connect to backend:', `${window.API_CONFIG.BASE_URL}${window.API_CONFIG.ENDPOINTS.CHAT}`);
                
                // Call AI backend
                const response = await fetch(`${window.API_CONFIG.BASE_URL}${window.API_CONFIG.ENDPOINTS.CHAT}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: message,
                        language: currentLanguage,
                        user_id: 'demo_user'
                    })
                });
                
                console.log('Backend response status:', response.status);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Backend response data:', data);
                    return data.response;
                } else {
                    console.error('Backend error:', response.status, response.statusText);
                    throw new Error(`Backend error: ${response.status}`);
                }
            } catch (error) {
                console.error('Connection error:', error);
                return getFallbackResponse(message);
            }
        }
        
        // Fallback response when AI is unavailable
        function getFallbackResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Emergency detection with high priority
            const emergencyKeywords = [`emergency`, `urgent`, `chest pain`, `can't breathe`, `difficulty breathing`, `blood`, `unconscious`, `severe pain`, `heart attack`, `stroke`, `choking`];
            if (emergencyKeywords.some(keyword => lowerMessage.includes(keyword))) {
                return healthResponses.emergency;
            }
            
            // Symptom checking with detailed responses
            for (const [symptom, data] of Object.entries(healthResponses.symptoms)) {
                if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                    return data.response;
                }
            }
            
            // Default response
            return `🤖 **HealthBot Assistant (Offline Mode)**

I'm currently running in offline mode, but I can still help with basic health guidance.

**Your Question:** "${message}"

**General Advice:**
• For symptoms: Monitor and note duration/severity
• For emergencies: Call 108 immediately
• For prevention: Maintain hygiene and healthy lifestyle
• For medications: Consult healthcare professionals

**⚠️ Medical Disclaimer:** This is general information only. Always consult qualified healthcare professionals.

**Confidence Level:** 70% | **Status:** Offline Mode

Would you like me to provide more specific guidance?`;
        }

        // Architecture component highlighting
        function highlightComponent(element) {
            const components = document.querySelectorAll(`.arch-component`);
            components.forEach(comp => comp.style.borderColor = `transparent`);
            
            element.style.borderColor = `var(--accent-green)`;
            element.style.transform = `translateY(-5px) scale(1.02)`;
            
            setTimeout(() => {
                element.style.transform = ``;
                element.style.borderColor = `transparent`;
            }, 3000);
        }

        // Language switching with enhanced translations
        function switchLanguage(lang, btnEl) {
            currentLanguage = lang;

            // Update active button state safely
            const langBtns = document.querySelectorAll(`.lang-btn`);
            langBtns.forEach(btn => btn.classList.remove(`active`));
            if (btnEl) {
                btnEl.classList.add(`active`);
            }

            // Fallback to English if requested language is missing
            const t = translations[lang] || translations['en'];

            const chatMessages = document.getElementById(`chatMessages`);
            chatMessages.innerHTML = `
                <div class="message bot">
                    ${t.greeting}
                    <span class="message-time">${getCurrentTime()}</span>
                    <div class="message-feedback">
                        <button class="feedback-btn" onclick="provideFeedback(this, 'positive')">
                            <i class="fas fa-thumbs-up"></i>
                        </button>
                        <button class="feedback-btn" onclick="provideFeedback(this, 'negative')">
                            <i class="fas fa-thumbs-down"></i>
                        </button>
                    </div>
                </div>
            `;

            chatHistory = [];
            messageCount = 0;
        }

        // Enhanced chatbot functionality
        function sendMessage() {
            const input = document.getElementById(`chatInput`);
            const message = input.value.trim();
            
            if (!message || isTyping) return;
            
            addMessage(message, `user`);
            input.value = ``;
            
            showTypingIndicator();
            
            // Simulate realistic response time based on message complexity
            const responseTime = Math.min(3000, message.length * 50 + 1000);
            
            // Use async AI response
            generateHealthResponse(message).then(response => {
                hideTypingIndicator();
                addMessage(response, `bot`);
                
                if (soundEnabled) {
                    playNotificationSound();
                }
            }).catch(error => {
                hideTypingIndicator();
                const fallbackResponse = getFallbackResponse(message);
                addMessage(fallbackResponse, `bot`);
            });
        }

        function handleEnter(event) {
            if (event.key === `Enter` && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        }

        // Enhanced quick actions with more realistic responses
        function quickAction(action) {
            const actions = {
                symptoms: `I have been experiencing fever, headache, and body aches for the past 2 days. What should I do?`,
                vaccine: `My 6-month-old baby is due for vaccinations. What vaccines should they receive at this age?`,
                prevention: `Can you give me tips to prevent seasonal illnesses during monsoon season?`,
                emergency: `I'm experiencing severe chest pain and shortness of breath. Please help!`
            };
            
            const message = actions[action];
            addMessage(message, `user`);
            
            showTypingIndicator();
            generateHealthResponse(message).then(response => {
                hideTypingIndicator();
                addMessage(response, `bot`);
                
                if (soundEnabled) {
                    playNotificationSound();
                }
            }).catch(error => {
                hideTypingIndicator();
                const fallbackResponse = getFallbackResponse(message);
                addMessage(fallbackResponse, `bot`);
            });
        }

        // Enhanced message display with better formatting and animations
        function addMessage(message, sender) {
            const chatMessages = document.getElementById(`chatMessages`);
            const messageDiv = document.createElement(`div`);
            messageDiv.className = `message ${sender}`;
            
            // Add entrance animation
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(20px) scale(0.9)';
            
            messageCount++;
            
            if (sender === `bot`) {
                messageDiv.innerHTML = `
                    ${formatMessage(message)}
                    <span class="message-time">${getCurrentTime()}</span>
                    <div class="message-feedback">
                        <button class="feedback-btn" onclick="provideFeedback(this, 'positive')">
                            <i class="fas fa-thumbs-up"></i>
                        </button>
                        <button class="feedback-btn" onclick="provideFeedback(this, 'negative')">
                            <i class="fas fa-thumbs-down"></i>
                        </button>
                    </div>
                `;
            } else {
                messageDiv.innerHTML = `
                    ${message}
                    <span class="message-time">${getCurrentTime()}</span>
                `;
            }
            
            chatMessages.appendChild(messageDiv);
            
            // Animate message entrance
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0) scale(1)';
            }, 50);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            chatHistory.push({ 
                message, 
                sender, 
                timestamp: new Date(),
                messageId: messageCount
            });
        }

        // Message formatting for better readability
        function formatMessage(message) {
            return message
                .replace(/\*\*(.*?)\*\*/g, `<strong>$1</strong>`)
                .replace(/\*(.*?)\*/g, `<em>$1</em>`)
                .replace(/\n/g, `<br>`)
                .replace(/•/g, `<span style="color: var(--accent-green);">•</span>`);
        }

        // Enhanced typing indicator
        function showTypingIndicator() {
            if (isTyping) return;
            
            isTyping = true;
            const chatMessages = document.getElementById(`chatMessages`);
            const typingDiv = document.createElement(`div`);
            typingDiv.className = `typing-indicator`;
            typingDiv.id = `typing-indicator`;
            typingDiv.innerHTML = `
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span>HealthBot is analyzing your query...</span>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTypingIndicator() {
            const typingIndicator = document.getElementById(`typing-indicator`);
            if (typingIndicator) {
                typingIndicator.remove();
            }
            isTyping = false;
        }

        // Utility functions
        function getCurrentTime() {
            return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }

        function provideFeedback(button, type) {
            const allFeedbackBtns = button.parentElement.querySelectorAll(`.feedback-btn`);
            allFeedbackBtns.forEach(btn => btn.classList.remove(`active`));
            button.classList.add(`active`);
            
            // You could send this feedback to analytics
            console.log(`Feedback: ${type} for message ${messageCount}`);
        }

        function playNotificationSound() {
            if (!soundEnabled) return;
            try {
                // create or reuse a shared AudioContext
                if (!audioContext) {
                    audioContext = new (window.AudioContext || window.webkitAudioContext)();
                }

                // Some browsers start AudioContext in suspended state until a user gesture
                if (audioContext.state === 'suspended') {
                    // try to resume; it's fine if the promise resolves later
                    audioContext.resume().catch(() => {});
                }

                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = 800;
                oscillator.type = `sine`;

                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
            } catch (err) {
                console.warn('playNotificationSound failed:', err);
            }
        }

        // Chat control functions
        function scrollToChatbot() {
            document.getElementById(`prototype`).scrollIntoView({ behavior: `smooth` });
        }

        // Robust smooth scroll to top: uses native smooth scrolling when available,
        // otherwise falls back to an rAF-based animation for older browsers.
        function scrollToTopSmooth() {
            try {
                // native support
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
            } catch (e) {
                // ignore and fallback
            }

            // Fallback animation
            const start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            const duration = 600; // ms
            const startTime = performance.now();

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function step(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = easeInOutCubic(progress);
                const current = Math.round(start + (0 - start) * eased);
                window.scrollTo(0, current);
                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }

        function clearChat() {
            const chatMessages = document.getElementById(`chatMessages`);
            chatMessages.innerHTML = `
                <div class="message bot">
                    Chat cleared! 🧹 How can I help you with your health questions today?
                    <span class="message-time">${getCurrentTime()}</span>
                </div>
            `;
            chatHistory = [];
            messageCount = 0;
        }

        function exportChat() {
            const chatData = {
                exportDate: new Date().toISOString(),
                language: currentLanguage,
                messageCount: chatHistory.length,
                messages: chatHistory
            };
            
            const blob = new Blob([JSON.stringify(chatData, null, 2)], {
                type: `application/json`
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement(`a`);
            a.href = url;
            a.download = `healthbot-chat-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        function toggleSound() {
            soundEnabled = !soundEnabled;
            const soundIcon = document.getElementById(`soundIcon`);
            const soundText = document.getElementById(`soundText`);
            
            if (soundEnabled) {
                soundIcon.className = `fas fa-volume-up`;
                soundText.textContent = `Sound On`;
                // Ensure the AudioContext is created/resumed on this user gesture so subsequent sounds play
                try {
                    if (!audioContext) {
                        audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    }
                    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
                } catch (err) {
                    console.warn('Unable to initialize audio context:', err);
                }
            } else {
                soundIcon.className = `fas fa-volume-mute`;
                soundText.textContent = `Sound Off`;
                // Optionally suspend audio to conserve resources
                try { if (audioContext && audioContext.state === 'running') audioContext.suspend().catch(() => {}); } catch (e) {}
            }
        }

        // Chart initialization
        function initializeCharts() {
            // User Engagement Chart
            const engagementCtx = document.getElementById(`engagementChart`);
            if (engagementCtx) {
                new Chart(engagementCtx, {
                    type: `line`,
                    data: {
                        labels: [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`],
                        datasets: [{
                            label: `Daily Active Users`,
                            data: [1200, 1900, 3000, 5000, 7500, 12000],
                            borderColor: `#0066cc`,
                            backgroundColor: `rgba(0, 102, 204, 0.1)`,
                            tension: 0.4
                        }, {
                            label: `Query Volume`,
                            data: [2400, 3800, 6000, 10000, 15000, 24000],
                            borderColor: `#00b894`,
                            backgroundColor: `rgba(0, 184, 148, 0.1)`,
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            // Query Categories Chart
            const categoryCtx = document.getElementById(`categoryChart`);
            if (categoryCtx) {
                new Chart(categoryCtx, {
                    type: `doughnut`,
                    data: {
                        labels: [`Symptom Check`, `Vaccination`, `Prevention Tips`, `Emergency`, `General Health`, `Medication`],
                        datasets: [{
                            data: [35, 20, 15, 10, 12, 8],
                            backgroundColor: [
                                `#0066cc`,
                                `#00b894`,
                                `#4da6ff`,
                                `#e17055`,
                                `#00cec9`,
                                `#fd79a8`
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: `bottom`
                            }
                        }
                    }
                });
            }

            // Response Accuracy Chart
            const accuracyCtx = document.getElementById(`accuracyChart`);
            if (accuracyCtx) {
                new Chart(accuracyCtx, {
                    type: `bar`,
                    data: {
                        labels: [`Week 1`, `Week 2`, `Week 3`, `Week 4`, `Week 5`, `Week 6`],
                        datasets: [{
                            label: `Accuracy %`,
                            data: [72, 76, 81, 84, 87, 89],
                            backgroundColor: `#00b894`,
                            borderColor: `#00b894`,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 100
                            }
                        }
                    }
                });
            }

            // Regional Usage Chart
            const regionalCtx = document.getElementById(`regionalChart`);
            if (regionalCtx) {
                new Chart(regionalCtx, {
                    type: `radar`,
                    data: {
                        labels: [`Hindi`, `English`, `Bengali`, `Kannada`, `Odia`],
                        datasets: [{
                            label: `Usage %`,
                            data: [28, 25, 18, 12, 10],
                            backgroundColor: `rgba(0, 102, 204, 0.2)`,
                            borderColor: `#0066cc`,
                            pointBackgroundColor: `#0066cc`
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: 30
                            }
                        }
                    }
                });
            }
        }

        // AI Assistant Widget Functions
        function toggleAIChat() {
            const widget = document.getElementById('aiChatWidget');
            if (!widget) return;
            const willOpen = !widget.classList.contains('active');
            widget.classList.toggle('active');
            // optional a11y sync if the trigger button is present
            const trigger = document.querySelector('.ai-assistant-widget .ai-button');
            if (trigger) trigger.setAttribute('aria-expanded', String(willOpen));
        }

        function sendAIMessage() {
            const input = document.getElementById('aiInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            addAIMessage(message, 'user');
            input.value = '';
            
            generateHealthResponse(message).then(response => {
                addAIMessage(response, 'bot');
            }).catch(error => {
                const fallbackResponse = getFallbackResponse(message);
                addAIMessage(fallbackResponse, 'bot');
            });
        }

        function handleAIEnter(event) {
            if (event.key === 'Enter') {
                sendAIMessage();
            }
        }

        function addAIMessage(message, sender) {
            const messagesContainer = document.getElementById('aiChatMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'ai-message';
            
            if (sender === 'user') {
                messageDiv.style.background = 'var(--primary-blue)';
                messageDiv.style.color = 'white';
                messageDiv.style.marginLeft = '20px';
                messageDiv.style.textAlign = 'right';
            }
            
            messageDiv.innerHTML = formatMessage(message);
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Modern Animation Enhancements
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                        entry.target.classList.add('animate-in');
                    }
                });
            }, observerOptions);

            // Observe all sections and cards
            document.querySelectorAll('.section, .feature-card, .arch-component, .timeline-item').forEach(el => {
                el.style.animationPlayState = 'paused';
                observer.observe(el);
            });
        }

        // removed addParallaxEffect(): the previous implementation used an invalid
        // selector (".header::before") and caused runtime issues in some browsers.
        // Parallax visuals were non-essential for the prototype and were removed to
        // reduce runtime overhead and avoid selector errors.

        function addHoverEffects() {
            // Add magnetic effect to buttons
            document.querySelectorAll('.prototype-button, .quick-action, .send-btn').forEach(button => {
                button.addEventListener('mousemove', (e) => {
                    const rect = button.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.transform = '';
                });
            });
        }

        // removed addTypingEffect(): a decorative typing animation was not used
        // in the current UX flow and added unnecessary complexity. Keeping the
        // DOM and CSS simple improves performance on low-end devices.

        // Initialize the page
        document.addEventListener(`DOMContentLoaded`, function() {
            // Chart.js theme defaults (if Chart is present)
            try {
                if (window.Chart) {
                    Chart.defaults.font.family = 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
                    Chart.defaults.color = getComputedStyle(document.documentElement).getPropertyValue('--text-dark') || '#0b1a2b';
                    Chart.defaults.plugins.legend.labels.color = getComputedStyle(document.documentElement).getPropertyValue('--text-dark') || '#0b1a2b';
                }
            } catch (_) {}

            // Ensure floating AI widget starts closed (no surprise pop-ups)
            (function ensureChatWidgetClosed() {
                try {
                    const widget = document.getElementById('aiChatWidget');
                    if (widget) widget.classList.remove('active');
                    const trigger = document.querySelector('.ai-assistant-widget .ai-button');
                    if (trigger) trigger.setAttribute('aria-expanded', 'false');
                } catch (_) {}
            })();

            // Initialize charts
            setTimeout(initializeCharts, 100);
            
            // Initialize modern animations
            initScrollAnimations();
            addHoverEffects();
            
            // Set up event listeners
            const chatInput = document.getElementById(`chatInput`);
            if (chatInput) {
                chatInput.addEventListener(`keypress`, handleEnter);
                
                // Auto-resize input based on content
                chatInput.addEventListener(`input`, function() {
                    const sendBtn = document.getElementById(`sendBtn`);
                    sendBtn.disabled = this.value.trim() === ``;
                });
            }
            
            // Add welcome animation
            setTimeout(() => {
                const firstMessage = document.querySelector(`.message.bot`);
                if (firstMessage) {
                    firstMessage.style.animation = `messageSlide 0.6s ease`;
                }
            }, 500);

            // Removed scroll-based animation reduction to prevent UI from popping after scroll ends
        });