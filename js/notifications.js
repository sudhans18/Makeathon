document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  
  // Define notifications with their release dates (10:30 AM IST)
  // IST is UTC+5:30
  const notificationsData = [
    {
      id: 1,
      releaseDate: new Date('2026-04-07T10:30:00+05:30').getTime(),
      content: "Welcome to Make-A-Thon 7.0! We are thrilled to have you here. Get ready to build beyond limits."
    },
    {
      id: 2,
      releaseDate: new Date('2026-04-08T10:30:00+05:30').getTime(),
      content: "Due to institutional commitments related to upcoming election processes and venue requirements, the event has been postponed and will now be tentatively held in the last week of april 2026."
    },
    {
      id: 3,
      releaseDate: new Date('2026-04-09T10:30:00+05:30').getTime(),
      content: "**Registartions are still open**. Missed Registering earlier? You still have your chaance to be part of the innovation sprint."
    },
    {
      id: 4,
      releaseDate: new Date('2026-04-10T10:30:00+05:30').getTime(),
      content: "New registration deadline for Hardware, software and Industry Problem statements : April 17th, 2026."
    }
  ];

  const now = new Date().getTime();
  
  const visibleMessages = notificationsData.filter(msg => now >= msg.releaseDate);
  
  if (visibleMessages.length === 0) {
    chatBox.innerHTML = '<div class="no-messages">NO TRANSMISSIONS YET...</div>';
    return;
  }
  
  // Parse markdown bold **text** -> <strong>text</strong>
  function parseContent(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }

  // Format date nicely
  function formatDate(timestamp) {
    const d = new Date(timestamp);
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return d.toLocaleDateString('en-US', options);
  }

  // Render messages
  visibleMessages.forEach((msg, index) => {
    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message';
    // Stagger animation based on index
    msgEl.style.animationDelay = `${index * 0.15}s`;
    
    msgEl.innerHTML = `
      <div class="bubble">
        ${parseContent(msg.content)}
      </div>
      <div class="meta">
        <span class="sender">SYSTEM</span> • <span class="time">${formatDate(msg.releaseDate)}</span>
      </div>
    `;
    chatBox.appendChild(msgEl);
  });
  
  // Auto-scroll to the bottom.
  setTimeout(() => {
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 100);
});
