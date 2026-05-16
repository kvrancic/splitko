# **Splitko — Vision & Build Plan**

The conceptual core and the hackathon demo scope, in one document. No timelines. Tech mentioned only where it's a product decision (Next.js, Supabase, mocked LLM). Everything else is mocked for the demo and built for real later.

---

## **What Splitko is, in one sentence**

**Splitko is the orchestrator layer for the city of Split — one agentic brain wired to every public data source, exposed through three human interfaces (a dynamic web dashboard, WhatsApp, and a phone number for grandmothers), and built so that every new data port plugged into it unlocks a new capability without anyone shipping a new app.**

---

## **The thesis: in 2026, you don't build verticals. You build an orchestrator.**

Every civic app that has ever been built in this country was a vertical. A bus app. A parking app. A beach app. A bureaucracy portal. Each one had to win its users from scratch, each one fought the chicken-and-egg problem alone, each one died at the seam between "I have a small audience" and "I have enough data to be useful."

**The vertical era is over.** It died the moment LLMs became good enough to act as a general orchestrator over arbitrary data. In 2026 the product is no longer the feature — the product is the layer that turns any data port into a capability, and any capability into a conversation.

The architecture of Splitko is three stacks deep, and only one of them is interesting:

1. **Data ports.** DHMZ weather and storm. Izor sea quality. Promet bus positions and a decade of parking-spot sensors. Public webcams over Riva, Bačvice, Žnjan, Marjan. Gov.hr life-event pages. e-Građani service catalog. HAK traffic and ferry status. Inside-Airbnb-style listing data. KBC public queue indicators. Croatian Census housing stock per kvart. Every port is just another connector — none of them are the product.  
2. **The orchestrator.** A fully agentic LLM layer with tools, MCPs, and a memory of every interaction it has ever had with you and with the city. This is the actual product. The orchestrator can chain tool calls, reason over multiple data sources at once, decide what UI to render, write back to data sources, and serve any human-facing surface plugged into it.  
3. **The HCI surfaces.** Three of them. The web dashboard with a dynamic UI that reconfigures itself around your intent. WhatsApp. A phone number that any 78-year-old can dial.

**Here is the punchline of the whole thesis: once the orchestrator and the data ports exist, everything else is just HCI.** Building a new feature in 2026 is not building a new app. It is plugging in a new data port, writing a few new tool descriptions, and deciding what the answer looks like in each of the three surfaces. **The capabilities are endless because they are not coupled to interfaces.** You don't decide "we will build the beach app this quarter." You decide which data Splitko speaks fluently, and the user's question decides what gets shown.

This is why the same Splitko handles "should I go to Žnjan now," "report a broken streetlight," "kako otvoriti obrt," "what's open in Lučac tonight," and "find me a sublet for July" — and why none of these required us to ship a separate app. They are all the same conversation, with the same brain, on whichever surface the user happens to be on.

**Data is the modern day gold.** Whoever solves problem A for a Splićanin has already solved the acquisition problem for problem B, problem C, and problem D — because the Splićanin is already in the conversation, already trusts the agent, already has it open. **This is the chicken-and-egg problem dissolved.** Critical mass is reached once, by whichever block earns the user first, and from there the flywheel runs on its own.

You could not have built this in 2022\. The integration cost was too high, the model wasn't smart enough to orchestrate, the tool-use story was a research demo. Today the model can chain ten tools across five data sources and serve the answer to WhatsApp in plain Croatian. The constraint moved from "can it be built" to "who is building it." For Split, the answer right now is nobody.

---

## **The premise: Split has a €403M budget and zero connected layer**

Split has the largest city budget in its history for 2026\. It has buses with live positions, parking sensors that Promet has been deploying for a decade, sea-quality data published in real time by Izor, weather and wind from DHMZ, dozens of public webcams pointed at the parts of the city tourists and locals actually use, an e-Građani service catalog, and roughly seven million tourist nights a year crossing through the airport, the ferry terminal, and the bus station.

None of it talks to each other.

A Splićanin who wants to decide whether to take the kid to Bačvice opens six apps. A tourist arriving from Italy opens nothing, because nothing exists. A pensioner asks a grandchild. A foreigner who sees a pothole on Trumbićeva doesn't even know which office handles it. **The data exists. The agent that uses it does not.**

The most painful local version of this is Bačvice. Bačvice should be the gem of Split — a postcard beach, the cradle of picigin, in walking distance of the old town. Instead it has terrible Google reviews, crowded sand, water rated only "satisfactory" by the public health institute in the east section, and a parking lot that fills by 9am every July morning. The city has all the data needed to fix this. None of it is in front of a citizen who could act on it. **When Splitko surfaces this — when an ordinary Splićanin can see "yes, Bačvice east is rated satisfactory again this week, here is the trend over the season" — the political pressure to fix it becomes inevitable.** That is what data is good for.

---

## **The global funnel — every city above ours has been doing some version of this for fifteen years**

**Buenos Aires** built Boti — a WhatsApp city agent — and ran 26 million conversations through it in a single quarter of 2022\. Over seventy public procedures handled by one chatbot. That number has not slowed.

**San Francisco** built SFpark in 2011 — dynamic, demand-based parking pricing driven by sensors in every metered spot, with documented reductions in cruising time and double-parking. Fifteen years ago. We have the sensors already. We do not have the layer that uses them.

**Barcelona** spent the 2010s instrumenting itself end-to-end — smart lighting, smart water, smart waste, smart parking, citizen apps, open data — and publishes cumulative savings in the tens of millions of euros per program category, with positive net job creation from the smart-city portfolio.

**Dubrovnik** runs cameras over Stradun that count people in real time, throttle entry to the Old Town when crowd density exceeds threshold, and feed that into a public dashboard. A Croatian city of 40,000 people. An hour and a half down the coast from where we built nothing.

**Split.** Seven million tourist nights. Diocletian's palace. A €403M budget. Sensors in the ground. Cameras on the walls. The data is already collected.

And the layer on top is empty.

That is the entire opportunity, and it is large enough to make Split the most digitally legible city in Croatia by a margin that nobody else is positioned to close.

---

## **The three HCI surfaces — one brain, three ways to talk to it**

Splitko is not an app. Splitko is **a city-scale agent**, and you reach the same agent through whichever surface fits your life.

### **Surface one — the web dashboard (primary)**

This is the flagship. The dashboard is a dynamic interface where Splitko shows you the live state of Split, organized around what you actually came here to do. On first open, the default view shows everything at once — beaches with current sea quality, parking availability per zone, where the buses are, what the wind is doing, what's open in your neighborhood, the civic-action queue ("two streetlights reported on your block this week, both still open"). It is a city control panel for a citizen.

The dashboard has an embedded conversation panel — type or speak a question, the answer composes itself in chat and also reshapes the surrounding tiles. You ask "idem na kavu na Rivu, vrijedi li sad?" and the dashboard recomposes around Riva — the relevant webcam frame, the parking zones in walking distance, the bus that gets you home, the alternative if Riva is too crowded. **This is the dynamic UI principle: the interface adapts to the intent, not the other way around.** You don't navigate to features. The features assemble themselves around your question.

There is also a separate, ChatGPT-style conversation tab — same brain, but optimized for users who want to see the tool calls in flight, the data ports being read, the MCPs being invoked. This is the "show your work" view, and it is itself a piece of pitch material. It demonstrates, on-screen, that Splitko is not a wrapper around an LLM. It is an orchestrator with real tools wired into real data ports.

### **Surface two — WhatsApp**

Most Splićani use WhatsApp more than any other interface in their phone. Splitko has a WhatsApp number. You message it in Croatian or English, you get the same agent that answers on the dashboard, with the same memory of who you are and what you've asked before. The agent can do everything the dashboard can do — answer, schedule a notification, send you a photo of a webcam frame, accept a problem report (the image \+ your location is the report), confirm that a city department received your ticket.

Boti runs Buenos Aires this way. There is no good reason WhatsApp shouldn't be the second-most-used surface for Splitko by the end of its first year.

### **Surface three — the phone number**

A landline-friendly phone number. The kind of number a 78-year-old reads off a magnet on her fridge. She dials it. The agent picks up in Croatian. She asks what she needs, the agent walks her through it in the dialect she actually speaks, and when the question needs a real human — a clerk, a pharmacist, a doctor's receptionist, a grandchild — the agent transfers the call with a one-line briefing for the person on the other end.

This is the surface that makes the "Splitko is for everyone" line literally true rather than aspirationally true. **It is also the most underbuilt surface in the entire civic-tech world, because voice was expensive in 2022 and is no longer expensive in 2026\.** This is a one-shot opportunity to be first.

---

## **The Lego blocks — what Splitko does, organized around capabilities not features**

Each block below is a capability the orchestrator gains by plugging in one or two more data ports. None of them is an app. All of them are reachable from any of the three surfaces, and all of them feed signal back into the same brain.

### **Daily decisions — "should I go right now?"**

Sea quality at the relevant beach, live parking availability from Promet's data, bus position and crowdedness, weather, wind, webcam-derived crowd density, time-of-day patterns the system has learned. Splitko fuses all of this and gives a single answer in your language — *"Don't go to Riva now, it's packed. Bačvice in 20 minutes is better — sea rated excellent today, bus 17 leaves Sukoišan in 4 min, parking around Matejuška full."*

Sub-blocks that fall directly out of the same data ports:

* **Beach concierge** — which beach is worth it right now, with the public health institute's sea-quality rating, current wind, water temperature, crowd score from the public webcam. Bačvice gets the visibility it deserves, including the days it doesn't.  
* **Bus reality** — where the bus actually is versus where Promet's timetable claims it should be. Crowdsourced "bus full / bus empty / late" taps from every Splitko user feed the next prediction.  
* **Parking signal** — which Promet zones and garages have spots open, surfaced from the sensor network already in the ground. The same signal, aggregated, is what enables **dynamic parking pricing under the hood for the city** — SF-style, driven by real demand, with the citizen-facing answer being "park here, costs €X right now" rather than the cruising-and-praying game today.  
* **Ferry \+ bus \+ parking trip planning** — you say "I want to be on Brač at 11" and Splitko composes the ferry slot, the bus to the port, the parking strategy, and whether you'd actually make it given current traffic. **This is one of the highest-pain Split-specific problems** — islands, ferries, parking, and buses are four separate systems today, with no human-friendly way to combine them. Fixing this single block alone justifies the project.

### **Civil safety and protection**

Computer vision on Marjan/Mosor/Žnjan webcams watching for smoke. DHMZ wind and humidity combined with satellite hotspot data. Bura warnings translated into the language and the practical implications of the specific user — *"don't take the scooter to Klis today, gusts at 90 km/h, ferries to Brač canceled after 14:00."* Flash-flood alerts for Trumbićeva when forecast crosses the threshold.

**Machines see things faster than humans dial 112\.** When Splitko's vision pipeline detects smoke that crosses a confidence threshold, the alert is forwarded to civil protection without disturbing the wider population. When the signal is borderline, the agent logs and watches. The 2017 Marjan fire is the local memory this block is built against. The same vision pipeline that powers the beach-crowd score doubles as the early-warning system — **one data port, two capabilities, zero additional engineering.** This is what the orchestrator architecture buys.

### **Civic action — "this is broken, fix it"**

The simplest, most viscerally demoable block in the entire system. A Splićanin sees a pothole, a dead pigeon, an overflowing bin, a broken streetlight. They open Splitko, take a photo, the agent classifies the issue, geocodes from the image and GPS, and routes the structured report to the right Split department with the right metadata. The user sees a ticket number, a routing path, and a status that updates.

The same data, aggregated, produces something no Splićanin has ever seen: **a live public map of what the city is currently broken at, who's been notified, and how long it has been since they were told.** That map is, by itself, a piece of civic accountability that does not exist today. It is also a permanent argument the city has to engage with.

### **Crowdsourcing — every interaction makes the next one better**

Splitko's predictions are only as good as its signal. Every accept-or-reject of a recommendation, every "bus full" tap, every "yes the beach is fine now" confirmation, every "no Splitko, the parking lot is actually closed for repairs" correction trains the system for the next person. 

A year in, Splitko knows things about how Split actually works at 6pm on a Tuesday in late June that no other system in the world has access to. Not Google. Not the city. Not Promet. **Splitko.** This is the moat. RLHF essentially. 

### **Bureaucracy — the porezna in your pocket (RAG)** 

The block that earns every adult resident, and saves every one of them hours per year.

You ask, *"kako otvoriti obrt"*, *"trebam li dozvolu da renoviram baki kuću u Varošu"*, *"što mi treba da prijavim novo prebivalište nakon povratka iz Njemačke"*. Splitko reads the actual public sources — gov.hr life-event pages, the e-Građani service catalog, Porezna FAQs, Split city-hall pages — and produces a personalized checklist with the exact office, the exact form, the exact opening hours, the exact fees, the exact next step.

Splitko does not act on your behalf inside e-Građani. It does not ask for your OIB to transact. **It just explains, in your language, what the system currently makes impossible to find.** That is more than enough to make this one of the most beloved blocks once it exists.

### **Legal and document RAG**

The same architecture, slightly extended, reads Split-specific documents. Statute of the City of Split. GUP and urbanistički plan extracts for your address. Building-permit procedures. *"Kako dobiti građevinsku dozvolu za adaptaciju u Lučcu"* gets a real answer with citations to the actual document and the actual office that processes it. These documents exist today and are unsearchable by anyone who isn't a specialist. **RAG over the city's own publications turns a moat that protects insider knowledge into a floor that lifts everyone.** 

### **Smart triage and health queues**

Connected to some API with a partnership with HZZO about scheduling requests and estimated wait times, all data encrypted and safe. Say ideally they allow as to handle scheduling as I developed a genetic algorithm for hospital scheduling that won REctor’s award in 2023 for best scientific work. 

### **Agentic marketplace — broker disintermediation for the housing crisis**

Split's housing market is broken. Asking prices crossed €5,000/m². Brokers take fees on both sides for what is, in 2026, work that a pair of agents can do for free. Students leave for the summer and need to sublet. Families arrive for the season and need a place. Neither side can find the other without paying a percentage to a person whose only function is to know both lists.

**Splitko puts an agent on each side of the transaction.** A student tells their Splitko: *"I'm gone June through August, here's my room in Manuš, here's what I want for it."* A family tells their Splitko: *"we're arriving from Frankfurt for July, two kids, need a place within 2km of OŠ Manuš, budget X."* The two Splitkos talk. They surface the match. They handle the back-and-forth. They can negotiate price within the bands their humans gave them. The humans show up to sign and meet.

The same architecture extends to bikes, scooters, baby gear, anything where the friction is "I need to find the right counterparty and the broker tax is unjust." **The point isn't a marketplace. The point is that agents make brokerage free, and Splitko is where that becomes real for Split.**

### **Cultural and community calendar**

Klape concerts, neighborhood markets, school holidays, traffic disruptions, parish festivities, Hajduk fixtures, ferry-schedule changes, what's open on Sunday. Splitko answers *"što ima u Splitu večeras s djecom"* and actually knows.

Cheap block to build. High-leverage block to ship. Once a user is asking Splitko what's on tonight, that user is using Splitko several times a week, and the flywheel is fully loaded.

---

## **Dynamic UI — the dashboard that knows what you came for**

The dashboard does not have a fixed layout. It has a **default state** — the city as a control panel, everything Splitko knows about right now, organized so a Splićanin opening the app for the first time understands instantly what they are looking at. Beaches, transit, parking, weather, civic queue, what's open.

The moment you express an intent — by typing into the chat panel, by clicking a tile, by speaking — **the dashboard reconfigures**. Tiles rearrange. Irrelevant data fades. Relevant data expands. New tiles appear. The webcam frame loads. The map zooms. The recommendation card composes itself.

This is not a UI in the traditional sense. **It is a generative UI driven by the orchestrator.** The agent decides what should be visible given what you're trying to do, the same way it decides which tool to call. The user never has to find the right tab — the right tab assembles itself around them.

For the demo, the dynamic UI is mocked with a small set of curated layouts triggered by detected intent. Beach intent renders the beach layout. Transit intent renders the transit layout. Bureaucracy intent renders the checklist layout. Civic-report intent renders the camera \+ map layout. **The mock is enough to communicate the principle.** The real implementation reads the same orchestrator output and renders any layout the model can describe.

---

## **The flywheel — three chains that demonstrate compounding**

The "Lego blocks compound" claim is only worth making if it is concrete. Three chains that each show problem A directly making problem B work better:

**Chain one — beach to bus to civic action.** You ask Splitko whether to go to Žnjan now. It tells you the sea is excellent there and bus 12 is 4 minutes away. You accept the recommendation. That accept trains the model. You board the bus, the bus is fuller than predicted, you tap "bus full." Two hours later, walking back, you see a broken streetlight at the Žnjan promenade entrance. The same Splitko is one tap away. **The trust built in block one is why you used block two without thinking.**

**Chain two — bureaucracy to marketplace.** Your cousin is moving back from Zagreb in October. You ask Splitko about prijava prebivališta. Splitko explains. Two weeks later, the cousin asks the same Splitko whether their old room in Lučac can be sublet, and the marketplace block matches it with a family arriving from Frankfurt. **Bureaucracy earned the cousin as a user; marketplace kept them.**

**Chain three — voice to civil protection.** An 80-year-old in Mejaši calls the Splitko number to ask about a prescription. The voice agent helps. Later that month, Bura hits. The same number — the one she already trusts — is how the safety block reaches her with a warning, in a voice she recognizes, telling her not to go to the lower floor if it floods. **One voice channel solves three problems and reaches a population no civic app has ever reached.**

These chains are not hypothetical. They are the simplest path each user takes the moment more than one block exists. **Building each block separately would never have produced this. Building one orchestrator with many data ports does.**

---

## **Privacy and trust, stated cleanly**

* **No background location tracking.** Splitko knows where you are only when you tell it, only for the question you're asking, only for as long as that question is open.  
* **No standing share with state authorities.** SOS is per-incident, explicit, and one-shot.  
* **No transactions on your behalf inside e-Građani.** Splitko explains, recommends, prepares. The citizen acts. Splitko never holds credentials and never logs in as you.  
* **Aggregate-only on sensitive surfaces.** Crowd density is a number per location, not a database of faces. Housing analytics expose commercial-scale operators only; private hosts roll up to the neighborhood.  
* **Conversations are ephemeral by default.** Memory is opt-in, per feature, with the user in control.

The version of this product that surveils everyone is a different product. **Splitko is the version that earns trust by not building that version.**

---

## **The Splićanin test — one life, many surfaces, demonstrated**

Imagine **Marina, 38**. She lives in Lučac with her husband and two kids. Older son at OŠ Manuš, younger daughter in vrtić near Bačvice. Her husband drives to Solin for work. Her mother — baka Anka — is 76, lives in Mejaši, doesn't read screens. Her brother lives in Toronto and worries.

Tuesday 07:40. Marina opens the Splitko dashboard. The default view shows the city — buses moving, parking around her usual office green, weather mild, sea cold. She types: *"Kad moram krenuti da stignem oboje predati i na posao do 9:30?"* The dashboard reconfigures around her commute — the OŠ Manuš zone, the vrtić curb, the Riva parking, the bus alternative. She accepts the recommended departure time. Splitko learns this is her Tuesday pattern.

11:00. She remembers the broken streetlight near the vrtić entrance — the one she's been meaning to report for three weeks. She opens the same Splitko, taps the photo she took this morning. The agent classifies it (lighting), geocodes it (vrtić zone), routes it (Čistoća \+ EVN), and shows her a ticket. Two hours later: *"Vaš prijavljeni problem je primljen, status: dodijeljeno."* She is the first person in her life to have visible proof that the city heard her.

14:00. Husband on WhatsApp: *"idemo na Žnjan poslije posla?"* She asks Splitko on WhatsApp — Žnjan vs Kašjuni given current sea, current crowd, current wind. Splitko recommends Kašjuni at 17:30, suggests the bus because the lot will fill. She accepts. The family's beach pattern enters the model.

18:00. Baka Anka calls the Splitko number from her landline. She has a prescription she doesn't understand. The voice agent walks her through it, in the Dalmatian Croatian she actually speaks. When the question shifts to a follow-up appointment, the agent transfers her to the clinic line with a one-line briefing for the receptionist. Baka Anka has interacted with a piece of digital infrastructure she never would have downloaded.

A week later, the brother decides to sublet the apartment he still owns in Bačvice. The marketplace block matches it with a couple arriving from Berlin for the season. He pays no broker.

A month later, Marina asks Splitko what's happening this Saturday — her son's birthday. Splitko shows the klape concert in Diocletian's cellars, the Hajduk match, the family market in Manuš. They go to the cellars.

**Each block alone would have lost Marina to indifference. Together, they are the operating system of her week.** That is the thesis, demonstrated in one family in one neighborhood over the course of a normal month. **And the reason all of this happened — the reason she didn't open six apps, the reason her brother didn't pay a broker, the reason her mother used digital infrastructure for the first time — is that Splitko is not features. It is an orchestrator with many ports.**

---

## **What we build for the hackathon demo**

Everything below is what gets shipped in the build window. The conceptual vision above is what gets pitched. The demo is the proof that the vision is buildable.

**Stack: Next.js for the web app. Supabase for auth and any persisted state. All AI mocked — keyword-matched canned responses with realistic data. Python is reserved for after the mock, when real models replace the canned layer.** No Vapi, no real WhatsApp integration — both are demonstrated through mock surfaces inside the same web app.

### **The landing page**

Beautiful, marketing-grade, one long-scroll page. Hero with the one-line definition. Animated illustration of the three HCI surfaces (dashboard, WhatsApp bubble, phone). Marina story, find some animations online or design a person using some tool and then just change the positions etc. The world-funnel section — Buenos Aires (26M conversations),, Barcelona (millions in savings), Dubrovnik (Stradun cameras), Split (€403M, empty). The thesis statement: *"In 2026 you don't build a vertical. You build an orchestrator."* The Lego-blocks section as a grid of capability tiles, each with a one-line description and a small icon. A "see it work" CTA that scrolls into a live preview of the dashboard. 

The landing page is itself a piece of pitch material — if the demo gets cut short, the landing page completes the story. It needs to be a design masterpiecce. Use impeccable MCP. 

### **The login flow**

Supabase Auth handles this in an afternoon. Three sign-up paths: Google OAuth, email \+ password, and a "register with OIB" path that asks for date of birth and OIB. The OIB field validates against the actual ISO 7064 MOD 11,10 checksum so it feels real — anyone who tries a fake OIB gets a real rejection. DOB and OIB go into the profile and unlock bureaucracy features that are persona-conditional ("your retirement procedures are different from a 30-year-old's").

The login exists primarily so the judges feel the product is a real product, not a demo. Most of them will sign up, take one screenshot, and never return — which is fine, because the impression is "this is shipped" rather than "this is a hackathon mockup."

### **The dashboard (default state)**

When a logged-in user lands on the dashboard, they see the **city control panel**. Tiles arranged in a grid:

* **Beaches now** — a row of cards for Bačvice, Žnjan, Kašjuni, Bene, Trstenik. Each card has the current sea-quality rating (color-coded blue/green/yellow/red), water temperature, wind, a thumbnail from the public webcam if available, and a crowd score.  
* **Weather and warnings** — DHMZ current \+ the next-12h, with any active alerts highlighted.  
* **Civic queue** — your reports and your kvart's reports, with status badges.  
* **What's on tonight** — the cultural calendar tile.  
* **Bureaucracy quick actions** — three or four pre-canned procedures the user is likely to need given their DOB and profile.

Every tile is interactive. Clicking a tile expands it into a full panel. The whole grid is implemented so that **a query in the chat panel reconfigures it** — that's the dynamic UI moment.

### **The conversation panel (embedded in the dashboard)**

A persistent chat panel on the right edge of the dashboard. Type or speak a question. The dummy LLM matches the query against a set of canned intents and returns a scripted answer paired with a layout instruction. The dashboard reconfigures around the layout instruction. The chat panel shows the answer in natural language with citations to the data ports it "consulted."

For the demo, six to eight canned intents cover the show: beach intent, transit intent, parking intent, bureaucracy intent, civic-report intent, marketplace intent, cultural-calendar intent, voice-handoff intent. Each one has two or three example phrasings so the judges can try variations and get sensible answers.

### **The "ChatGPT-style" tab — show your work**

A separate top-level tab. Same brain, different UI. This is a single-pane chat with no surrounding dashboard. The interesting thing here is that **every answer shows its tool calls in flight** — animated, like a real agentic console. The user sees: *"Calling getSeaQuality(Bačvice)... Calling getWebcamFrame(Bačvice-east)... Calling getBusETA(stop=Sukoišan, line=17)... Composing answer..."* and then the answer renders.

This tab also shows the **list of available tools and data ports** in a sidebar — DHMZ, Izor, Promet Buses, Promet Parking, Webcam Vision, e-Građani Catalog, City Statute, GUP, Cultural Calendar, KBC Public Queue, Marketplace, Civic Action Router, etc. Each one is clickable and shows what it returns. **This is the technical flex. The jury sees, on-screen, that Splitko is not a wrapper around an LLM. It is an orchestrator with real tools.** Even mocked, it reads as serious infrastructure.

### **The WhatsApp mock**

A page (or modal) styled as an iPhone with a WhatsApp conversation playing inside it. Click "play demo" and the conversation animates — the user types, Splitko responds, an image attachment loads, a confirmation comes back. Two or three scripted conversations: the beach concierge flow, the civic-report flow, the bureaucracy flow. **Recordable as a clean video for the pitch slide.**

### **The voice mock**

A page styled as a phone-call UI — incoming call from "Splitko," a "pick up" button, an animated waveform when the agent speaks, a live transcript scrolling in the middle. One scripted conversation: baka Anka asking about her prescription. The transfer-to-human moment is shown as the call handing off to a "Hospital reception desk" with a one-line briefing card visible to the user. **Audible if the demo room has sound; readable if it doesn't.**

### **What is mocked, what is real, what is honest about it**

* **Real:** Next.js app, Supabase auth, OIB checksum, the dashboard's UI layout and dynamic reconfiguration, the chat panel UX, the ChatGPT-style tool-call animation, the WhatsApp and voice mock UIs.  
* **Mocked:** the LLM itself (keyword-matched scripted answers), every data port (canned JSON files representing realistic sea quality, bus positions, parking, weather, webcam crowd scores) — apart from DHMZ XML data if accessible , the marketplace match (pre-staged listing pair), the voice synthesis (pre-recorded audio).  
* **Honest:** when asked, every block is presented as "this is the demo flow, the data ports are real public sources, the orchestrator is built but not connected to live LLMs in this build." **Nothing in the pitch claims more than what the demo shows.** The mocks are mocks because the data ports are real and the orchestrator pattern is real and Python \+ real models is a week of work, not nine hours.

---

## **What Splitko becomes — the flex**

Splitko is **Boti for the Adriatic, with a voice channel for grandmothers, a dynamic UI that reconfigures itself around your intent, and a marketplace that ends broker fees.** It is the first integrated layer between Split's existing data infrastructure and Split's actual residents. It is provably possible because every other major city has already done a fraction of it. It is provably needed because Split has done none of it. It is provably buildable in 2026 because the LLM collapsed the integration cost of doing it.

What Splitko does for the city's PR: it lets Split claim, with evidence, that it has the most advanced citizen interface in Croatia. **Not the most expensive. The most used. The first Croatian city where you don't open six apps. Where your grandmother is included. Where a broken streetlight gets routed in 90 seconds. Where the agent on your phone knows what Bačvice looks like right now.**

That is the city that gets written about. That is the city other cities study. That is the city other Splićani come back to.

The data is in the ground. The cameras are on the walls. The budget is signed. The grandmother is waiting for a number she can dial.

**The orchestrator is the thing that was missing. We are building the orchestrator.**

Some additional info:   
**Smart cities deliver real, quotable savings — but only when paired with a strong narrative.** Barcelona's IoT program generated \~€42.5M/yr in water savings, \~€36.5M/yr from smart parking, \~$37M/yr from smart lighting, and 47,000 jobs (SmartCityWorld / Harvard Data-Smart City Solutions). Those numbers are still cited in PR a decade later because Barcelona told a single coherent story. Grad Split needs the same: one platform, one tagline, one "Croatia's first" claim. [We Build Value](https://www.webuildvalue.com/en/reportage/barcelona-a-smart-city-with-a-feminine-touch.html)[Bismart](https://blog.bismart.com/en/why-barcelona-is-a-smart-city)

**Government chatbots scale fast when grounded — and fail catastrophically when not.** Buenos Aires' WhatsApp bot Boti hit 26,181,606 conversations in Q1 2022 (per the city's official April 29, 2022 release) and now handles 70+ municipal procedures end-to-end on the most-used messaging app in Argentina (\>80% phone penetration); January 2022 alone produced 11M conversations (per the OECD OPSI case study). Estonia's Bürokratt is positioning a network of LLM/RAG-grounded assistants across \~3,000 e-services with hosting cost of \~€150/month per institution. Conversely, NYC's MyCity (Colin Lecher, *"NYC's AI Chatbot Tells Businesses to Break the Law,"* The Markup, March 29, 2024\) told business owners they could legally take workers' tips and refuse Section 8 vouchers; Mayor Mamdani is now decommissioning the \~$600,000 system. The lesson is unambiguous: ship retrieval-grounded RAG over verified city documents, never a fine-tuned generative bot with free rein. [Buenos Aires Government \+ 11](https://buenosaires.gob.ar/gcaba_historico/jefaturadegabinete/innovacion/noticias/boti-el-chatbot-de-la-ciudad-supero-las-26-millones-de)

**Overtourism tech is now table stakes — and Croatia is already on the leaderboard.** Amsterdam's open-source Public Eye crowd-monitoring system reports 85–90% prediction accuracy on density without storing biometric data (per Cities Today / ITU, quoting Amsterdam crowd-monitoring team member Van Arman: *"the prediction models have an accuracy rate of 85 to 90 percent"*). Venice's €3M Smart Control Room tracks 25–30M arrivals/yr via anonymized telco data. Most relevant: **Dubrovnik already runs six computer-vision people-counting cameras at Old Town gates updated every 15 minutes, with a hard cap of 8,000 visitors inside the walls, and was just named 2026 European Green Pioneer of Smart Tourism.** Split-Dalmatia County recorded 20.7M overnight stays in 2024 — second only to Istria — and zero comparable system. There is an obvious "Dubrovnik did it, Split can do it better" PR opening. [Cities Today \+2 \+ 3](https://cities-today.com/why-the-city-of-amsterdam-developed-its-own-crowd-monitoring-technology/)

**The data Split needs already exists but is not actionable.** Sea-quality results for Bačvice and Žnjan are published by NZJZ Splitsko-dalmatinske županije via IZOR's `vrtlac.izor.hr/ords/kakvoca/kakvoca_mupute` map — but only as periodic samples in HTML, with no API and no push notification. Promet Split publishes vehicle positions and timetables through its app. DHMZ publishes a daily fire-weather index map. The 2017 Split wildfire burned \~4,500 hectares — an area the size of Rijeka — destroyed \~80 cars and \~10 houses, and prompted \>5,000 emergency calls in 24 hours, yet there is still no Split-specific public push-alert dashboard. **The opportunity is not collecting data; it is turning existing data into agentic, personalized action.** [T-Portal](https://www.tportal.hr/vijesti/clanak/pozar-spalio-sve-pred-sobom-evo-kako-izgleda-zrnovnica-danas-20170721/slika-259a13bd7bf4a5db221a83c38a125123)[Narod.hr](https://narod.hr/hrvatska/foto-dalmacija-u-plamenu-vatra-usla-u-split-stihija-prijeti-kvartovima-mejasi-i-kila)

**Split's worst public-data pain is "fragmented signal"**: DHMZ has free XML feeds (current obs, forecast, alerts, radar — published under the Open Licence of the Republic of Croatia), Izor (`vrtlac.izor.hr/kakvoca`) publishes bathing-water ratings on a blue/green/yellow/red interactive map, dozens of public webcams cover Riva/Bačvice/Žnjan/Marjan, and Inside-Airbnb-style data on \~5,400–6,900 Split listings is queryable. Nothing fuses these into one citizen-facing answer. [GitHub \+ 2](https://github.com/kpisacic/DHMZ-home-assistant-custom-component)

