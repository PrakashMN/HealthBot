        // Global variables
        let currentLanguage = `en`;
        let chatHistory = [];

        // Language translations
        const translations = {
            en: {
                greeting: `Hello! I'm your AI health assistant. How can I help you today?`,
                symptoms: `I can help you check your symptoms. Please describe what you're experiencing.`,
                vaccine: `I can provide vaccination information. What would you like to know?`,
                prevention: `Here are some preventive healthcare tips for staying healthy.`,
                emergency: `This seems like an emergency. Please call your local emergency services immediately.`
            },
            hi: {
                greeting: `नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?`,
                symptoms: `मैं आपके लक्षणों की जांच में मदद कर सकता हूं। कृपया बताएं कि आप क्या महसूस कर रहे हैं।`,
                vaccine: `मैं टीकाकरण की जानकारी प्रदान कर सकता हूं। आप क्या जानना चाहते हैं?`,
                prevention: `स्वस्थ रहने के लिए यहां कुछ निवारक स्वास्थ्य सुझाव हैं।`,
                emergency: `यह एक आपातकाल लगता है। कृपया तुरंत अपनी स्थानीय आपातकालीन सेवाओं को कॉल करें।`
            },
            bn: {
                greeting: `হ্যালো! আমি আপনার AI স্বাস্থ্য সহায়ক। আজ আমি কীভাবে আপনাকে সাহায্য করতে পারি?`,
                symptoms: `আমি আপনার উপসর্গ পরীক্ষা করতে সাহায্য করতে পারি। আপনি কী অনুভব করছেন তা বর্ণনা করুন।`,
                vaccine: `আমি টিকাদানের তথ্য প্রদান করতে পারি। আপনি কী জানতে চান?`,
                prevention: `সুস্থ থাকার জন্য এখানে কিছু প্রতিরোধমূলক স্বাস্থ্যসেবা টিপস রয়েছে।`,
                emergency: `এটি একটি জরুরি অবস্থা বলে মনে হচ্ছে। অনুগ্রহ করে অবিলম্বে আপনার স্থানীয় জরুরি সেবায় কল করুন।`
            },
            ta: {
                greeting: `வணக்கம்! நான் உங்கள் AI சுகாதார உதவியாளர். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?`,
                symptoms: `உங்கள் அறிகுறிகளை சரிபார்க்க நான் உதவ முடியும். நீங்கள் என்ன அனுபவிக்கிறீர்கள் என்று விவரிக்கவும்.`,
                vaccine: `நான் தடுப்பூசி தகவலை வழங்க முடியும். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?`,
                prevention: `ஆரோக்கியமாக இருக்க இங்கே சில தடுப்பு சுகாதார குறிப்புகள் உள்ளன.`,
                emergency: `இது ஒரு அவசரநிலை போல் தெரிகிறது. உடனடியாக உங்கள் உள்ளூர் அவசர சேவைகளை அழைக்கவும்.`
            },
            te: {
                greeting: `హలో! నేను మీ AI ఆరోగ్య సహాయకుడను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?`,
                symptoms: `మీ లక్షణాలను తనిఖీ చేయడంలో నేను సహాయం చేయగలను. మీరు ఏమి అనుభవిస్తున్నారో దయచేసి వివరించండి.`,
                vaccine: `నేను వ్యాక్సినేషన్ సమాచారాన్ని అందించగలను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?`,
                prevention: `ఆరోగ్యంగా ఉండటానికి ఇక్కడ కొన్ని నివారణ ఆరోగ్య చిట్కాలు ఉన్నాయి.`,
                emergency: `ఇది అత్యవసర పరిస్థితి అనిపిస్తుంది. దయచేసి వెంటనే మీ స్థానిక అత్యవసర సేవలకు కాల్ చేయండి.`
            }
        };

        // Sample responses for different query types
        const sampleResponses = {
            symptoms: {
                fever: `Based on your symptoms of fever and cough, this could indicate a respiratory infection. I recommend:\n\n1. Monitor your temperature regularly\n2. Stay hydrated and rest\n3. If fever persists above 101°F for more than 3 days, consult a healthcare provider\n4. Wear a mask around others\n\nAccuracy: 85% | Confidence: High`,
                headache: `Headaches can have various causes. Here's what I suggest:\n\n1. Ensure adequate hydration\n2. Check if you've been getting enough sleep\n3. Consider stress levels and screen time\n4. If severe or persistent, consult a doctor\n\nAccuracy: 78% | Confidence: Medium`,
                stomach: `For stomach pain and digestive issues:\n\n1. Avoid spicy or heavy foods\n2. Stay hydrated with clear fluids\n3. Consider probiotics\n4. If pain is severe or persists, seek medical attention\n\nAccuracy: 82% | Confidence: High`
            },
            vaccine: {
                child: `For children's vaccination schedule:\n\n• Birth: BCG, Hepatitis B\n• 6 weeks: DPT, Polio, Hepatitis B\n• 10 weeks: DPT, Polio\n• 14 weeks: DPT, Polio\n• 9 months: Measles\n• 15 months: MMR, Varicella\n\nNext due vaccines will be sent as reminders!`,
                adult: `Adult vaccination recommendations:\n\n• Annual flu vaccine\n• COVID-19 boosters as recommended\n• Tetanus booster every 10 years\n• Hepatitis B if not previously vaccinated\n\nConsult your healthcare provider for personalized advice.`,
                travel: `Travel vaccinations may include:\n\n• Hepatitis A and B\n• Japanese Encephalitis\n• Typhoid\n• Yellow Fever (if required)\n\nVisit a travel clinic 4-6 weeks before departure.`
            },
            prevention: [
                `🧼 Wash hands frequently with soap and water for at least 20 seconds`,
                `😷 Wear masks in crowded places and maintain social distancing`,
                `💧 Stay hydrated - drink at least 8 glasses of water daily`,
                `🥗 Eat a balanced diet rich in fruits and vegetables`,
                `🏃‍♂️ Exercise regularly - at least 30 minutes of physical activity daily`,
                `😴 Get adequate sleep - 7-9 hours for adults`,
                `🚭 Avoid smoking and limit alcohol consumption`,
                `☀️ Protect yourself from excessive sun exposure`
            ],
            emergency: `🚨 EMERGENCY PROTOCOL ACTIVATED 🚨\n\nFor immediate medical attention:\n📞 Emergency: 102 (India)\n🏥 Ambulance: 108\n☎️ Local Emergency: Contact your nearest hospital\n\nSymptoms requiring immediate attention:\n• Chest pain or difficulty breathing\n• Severe bleeding\n• Loss of consciousness\n• Severe allergic reactions\n\nDo not delay - seek immediate medical help!`
        };

        // Navigation functions
        function showSection(sectionId) {
            // Hide all sections
            const sections = document.querySelectorAll(`.section`);
            sections.forEach(section => section.classList.remove(`active`));
            
            // Show selected section
            document.getElementById(sectionId).classList.add(`active`);
            
            // Update navigation tabs
            const tabs = document.querySelectorAll(`.nav-tab`);
            tabs.forEach(tab => tab.classList.remove(`active`));
            event.target.classList.add(`active`);

            // Initialize charts if dashboard is selected
            if (sectionId === `dashboard`) {
                setTimeout(initializeCharts, 100);
            }
        }

        // Architecture component highlighting
        function highlightComponent(element) {
            // Remove previous highlights
            const components = document.querySelectorAll(`.arch-component`);
            components.forEach(comp => comp.style.borderColor = `transparent`);
            
            // Highlight selected component
            element.style.borderColor = `var(--accent-green)`;
            element.style.transform = `translateY(-5px) scale(1.02)`;
            
            // Reset after 3 seconds
            setTimeout(() => {
                element.style.transform = ``;
                element.style.borderColor = `transparent`;
            }, 3000);
        }

        // Language switching
        function switchLanguage(lang) {
            currentLanguage = lang;
            
            // Update language buttons
            const langBtns = document.querySelectorAll(`.lang-btn`);
            langBtns.forEach(btn => btn.classList.remove(`active`));
            event.target.classList.add(`active`);
            
            // Update chat greeting
            const chatMessages = document.getElementById(`chatMessages`);
            chatMessages.innerHTML = `
                <div class="message bot">
                    <strong>HealthBot:</strong> ${translations[lang].greeting}
                </div>
            `;
            
            // Reset chat history
            chatHistory = [];
        }

        // Chatbot functionality
        function sendMessage() {
            const input = document.getElementById(`chatInput`);
            const message = input.value.trim();
            
            if (!message) return;
            
            addMessage(message, `user`);
            input.value = ``;
            
            // Show typing indicator
            showTypingIndicator();
            
            // Generate response after delay
            setTimeout(() => {
                hideTypingIndicator();
                const response = generateResponse(message);
                addMessage(response, `bot`);
            }, 1500);
        }

        function handleEnter(event) {
            if (event.key === `Enter`) {
                sendMessage();
            }
        }

        function quickAction(action) {
            const actions = {
                symptoms: `I have fever and cough, what should I do?`,
                vaccine: `When should my child get the next vaccination?`,
                prevention: `Give me tips to prevent dengue fever`,
                emergency: `I'm having chest pain, please help`
            };
            
            const message = actions[action];
            addMessage(message, `user`);
            
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();
                const response = generateResponse(message);
                addMessage(response, `bot`);
            }, 1500);
        }

        function addMessage(message, sender) {
            const chatMessages = document.getElementById(`chatMessages`);
            const messageDiv = document.createElement(`div`);
            messageDiv.className = `message ${sender}`;
            
            if (sender === `bot`) {
                messageDiv.innerHTML = `<strong>HealthBot:</strong> ${message}`;
            } else {
                messageDiv.innerHTML = `<strong>You:</strong> ${message}`;
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Store in history
            chatHistory.push({ message, sender, timestamp: new Date() });
        }

        function showTypingIndicator() {
            const chatMessages = document.getElementById(`chatMessages`);
            const typingDiv = document.createElement(`div`);
            typingDiv.className = `message bot`;
            typingDiv.id = `typing-indicator`;
            typingDiv.innerHTML = `<strong>HealthBot:</strong> <div class="loading"></div> Analyzing your query...`;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function hideTypingIndicator() {
            const typingIndicator = document.getElementById(`typing-indicator`);
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        function generateResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Symptom checking
            if (lowerMessage.includes(`fever`) || lowerMessage.includes(`cough`)) {
                return sampleResponses.symptoms.fever;
            }
            if (lowerMessage.includes(`headache`) || lowerMessage.includes(`head`)) {
                return sampleResponses.symptoms.headache;
            }
            if (lowerMessage.includes(`stomach`) || lowerMessage.includes(`pain`)) {
                return sampleResponses.symptoms.stomach;
            }
            
            // Vaccination queries
            if (lowerMessage.includes(`child`) && lowerMessage.includes(`vaccin`)) {
                return sampleResponses.vaccine.child;
            }
            if (lowerMessage.includes(`adult`) && lowerMessage.includes(`vaccin`)) {
                return sampleResponses.vaccine.adult;
            }
            if (lowerMessage.includes(`travel`) && lowerMessage.includes(`vaccin`)) {
                return sampleResponses.vaccine.travel;
            }
            
            // Prevention tips
            if (lowerMessage.includes(`prevent`) || lowerMessage.includes(`tips`)) {
                const randomTips = sampleResponses.prevention.sort(() => 0.5 - Math.random()).slice(0, 4);
                return `Here are some important preventive healthcare tips:\n\n${randomTips.join(`\n`)}`;
            }
            
            // Emergency situations
            if (lowerMessage.includes(`emergency`) || lowerMessage.includes(`chest pain`) || lowerMessage.includes(`help`)) {
                return sampleResponses.emergency;
            }
            
            // Default response
            return `Thank you for your question. Based on my analysis, I recommend consulting with a healthcare professional for personalized advice. In the meantime, here are some general tips:\n\n• Stay hydrated\n• Get adequate rest\n• Monitor your symptoms\n• Seek immediate medical attention if symptoms worsen\n\nAccuracy: 75% | Confidence: Medium\n\nIs there anything specific you'd like to know more about?`;
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
                        labels: [`Hindi`, `English`, `Bengali`, `Tamil`, `Telugu`, `Marathi`],
                        datasets: [{
                            label: `Usage %`,
                            data: [28, 25, 18, 12, 10, 7],
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

        // Initialize the page
        document.addEventListener(`DOMContentLoaded`, function() {
            // Add initial chat message
            const initialMessage = translations[currentLanguage].greeting;
            
            // Set up event listeners
            const chatInput = document.getElementById(`chatInput`);
            if (chatInput) {
                chatInput.addEventListener(`keypress`, handleEnter);
            }
            
            // Initialize charts if dashboard is visible
            if (document.getElementById(`dashboard`).classList.contains(`active`)) {
                setTimeout(initializeCharts, 100);
            }
        });