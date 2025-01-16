
# Travel-Ease: A Tourism Website

**Travel-Ease** is a modern, responsive tourism website designed to help users explore popular tourist destinations and leave reviews for various locations.

## Features

- **Homepage**: Displays an overview of the website, with featured destinations and popular tourist spots.
- **User Authentication**: Users can register, log into their accounts.
- **Tourism Destinations**: Browse a list of tourist destinations and itineraries.
- **Review System**: Logged-in users can leave reviews for their favorite places.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, React.js
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB (used to store user data, reviews, and destination information)

## Installation

Sure! Here is the installation part rewritten with the specific steps you provided:

---

## Installation

### Prerequisites

- Node.js (v14 or later)
- Python (v3.6 or later)
- MongoDB (for local development, or MongoDB Atlas for cloud database)
- Git (for version control)

### To Run Locally

**Install dependencies for both client and server**:

   - For the **client** (React-based frontend):
     ```bash
     cd client
     npm i
     ```

   - For the **server** (Node.js backend):
     ```bash
     cd ../server
     npm i
     ```

3. **Run the backend**:
   - In the **server** folder, run:
     ```bash
     cd server
     node index.js
     ```

4. **Run the frontend**:
   - Open a new terminal, navigate to the **client** folder, and run:
     ```bash
     cd client
     npm run dev
     ```

5. **Access the Website**:
   - After running both the backend and frontend, you can access the website by opening the link provided in the terminal where you ran the `node index.js` command.
