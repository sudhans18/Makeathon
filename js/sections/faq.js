/* ═══════════════════════════════════════════════════════════
   js/sections/faq.js
   SPIDER-VERSE FAQ
   Interactive conversation between Miles and Peter
═══════════════════════════════════════════════════════════ */

const FAQ_DATA = [
    { q: 'Who can participate in MAKE-A-THON 7.0?', a: 'Any undergraduate engineering student can participate, regardless of year or department.<br><br>Participants from other colleges are also welcome. However, teams must be formed within the same college (cross-college teams are not allowed).' },
    { q: 'What are the requirements to participate?', a: 'To participate, you must:<br>• Register on the official website<br>• Submit your idea abstract (free of cost)<br>• Get shortlisted for the final round<br>• Complete the payment after shortlisting' },
    { q: 'Is there a registration fee?', a: 'Yes.<br>• Abstract submission: Free<br>• Final participation fee: ₹350 per participant (applicable only for shortlisted teams)' },
    { q: 'How many members can a team have?', a: 'Each team must have:<br>• Minimum: 4 members<br>• Maximum: 6 members' },
    { q: 'Is inter-college participation allowed?', a: 'No. Teams must consist of members from the same college, but can include students from different departments or years of study.' },
    { q: 'What kind of projects can we build?', a: 'Participants can build hardware, software, or hybrid solutions based on the provided problem statements.<br><br>Projects must be developed only during the 24-hour hackathon.<br>Pre-built projects will lead to immediate disqualification.' },
    { q: 'What are the tracks/domains for the hackathon?', a: 'The hackathon includes both Hardware and Software tracks, such as:<br>• AI & ML, IoT, Robotics, Embedded Systems, etc.<br>• Healthcare, Smart Cities, FinTech, Sustainability, etc.<br>• Cybersecurity, AR/VR, and more<br><br>Refer to the "Problem Statements / Tracks" section on the website for detailed domains.' },
    { q: 'When and where will the hackathon be conducted?', a: '📍 Venue: Multi-Purpose Hall (MPH), SVCE, Sriperumbudur<br>📅 Date & Time:<br>• 15th April 2026 – 9:00 AM (Start)<br>• 16th April 2026 – ~2:00 PM (End)' },
    { q: 'What will be provided during the hackathon?', a: 'Participants will receive:<br>• Certificates (Participation & Winners)<br>• Food & refreshments throughout the event<br>• Workstations & seating arrangements<br>• WiFi & power supply<br>• Mentorship & technical support<br>• ID cards / access bands<br>• Goodies, welcome kits, and more<br><br>Transportation support will be provided.<br>Accommodation (hostel) will be available for outstation participants at a nominal cost.' },
    { q: 'Will there be prizes?', a: 'Yes!<br>Participants can win:<br>• Cash prizes<br>• Certificates & recognition<br>• Internship opportunities<br>• Industry exposure & networking<br>• And much more<br><br>Top-performing teams may also gain opportunities for further development, mentorship, and industry collaboration.' },
    { q: 'Can I start working on my project before the hackathon?', a: 'You may brainstorm and prepare ideas in advance.<br><br>However, actual development must happen only during the hackathon.<br>Any violation will lead to disqualification.' },
    { q: 'Will mentors be available during the hackathon?', a: 'Yes.<br><br>Participants will have access to dedicated student mentors during designated mentoring rounds. They can assist with guidance, support, and basic troubleshooting.<br><br>However, their involvement will be limited to ensure fairness for all teams.' },
    { q: 'How are projects evaluated?', a: 'Projects will be evaluated based on:<br>• Innovation & originality<br>• Technical implementation<br>• Feasibility & real-world impact<br>• Prototype/demo quality<br>• Presentation<br><br>Evaluation will be conducted by a panel of faculty members, industry experts, and alumni.' },
    { q: 'Do participants get certificates?', a: 'Yes. All participants will receive participation certificates, and winners will receive winner certificates and recognition.' },
    { q: 'Are problem statements mandatory to follow?', a: 'Yes. All teams must build solutions strictly based on the official problem statements provided by the organizers.<br><br>There is no open innovation category.' },
    { q: 'Is prior hackathon experience required?', a: 'No. Beginners are welcome!<br><br>Make-a-thon is designed to encourage learning, experimentation, and innovation.' },
    { q: 'What should participants bring?', a: 'Participants are expected to bring:<br>• Laptops & chargers<br>• Required hardware components and tools (soldering kits, etc.)<br>• Extension boards, cables, and accessories<br>• Valid college ID<br>• Personal WiFi hotspots (recommended due to network congestion)<br>• Basic essentials (change of clothes, personal items, etc.)<br><br>Organizers will not provide any hardware components or software tools.' },
    { q: 'Will internet access be provided?', a: 'Yes, WiFi/LAN access will be available.<br><br>However, due to a large number of participants and possible network congestion, participants are strongly advised to bring their own WiFi hotspots.' },
    { q: 'Can participants leave the venue during the hackathon?', a: 'No. Participants are expected to remain within the venue and campus throughout the hackathon duration.<br><br>Exiting the venue will not be permitted once the event begins.' },
    { q: 'Who can we contact for queries?', a: 'Contact our student coordinators:<br>• Roshan M<br>• Aadharsh S<br>• Yaaminy K<br>• Roobuck ganesh rao<br>• Raeef M<br>• Harini V T<br><br>You may also reach out through official event communication channels:<br>admin@makeathon.in or @eceasvce.' }
];

export function initFAQ() {
    setupCustomDropdown();
}

function setupCustomDropdown() {
    const customSelect = document.getElementById('faq-custom-select');
    const trigger = document.getElementById('faq-custom-select-trigger');
    const optionsContainer = document.getElementById('faq-custom-select-options');
    const milesDefaultText = document.getElementById('miles-default-text');
    const peterAnswer = document.getElementById('peter-answer-text');

    if (!trigger || !optionsContainer || !milesDefaultText || !peterAnswer) return;

    FAQ_DATA.forEach((item, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'faq-custom-option';
        optionDiv.textContent = `${index + 1}. ${item.q}`;
        
        optionDiv.addEventListener('click', () => {
            trigger.textContent = `${index + 1}. ${item.q}`;
            milesDefaultText.innerHTML = `<strong>${item.q}</strong>`;
            
            peterAnswer.classList.remove('typing');
            void peterAnswer.offsetWidth;
            peterAnswer.innerHTML = item.a;
            peterAnswer.classList.add('typing');
            
            customSelect.classList.remove('open');
        });
        
        optionsContainer.appendChild(optionDiv);
    });

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        customSelect.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (customSelect && !customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
}
