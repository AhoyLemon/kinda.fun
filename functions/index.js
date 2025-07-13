// functions\index.js
// Required for Firebase Admin SDK to interact with Firestore
const admin = require("firebase-admin");
// Required for Firebase Functions V2 to define Firestore triggers
const { onDocumentDeleted } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger"); // For better logging in V2

// Initialize the Firebase Admin SDK.
// This allows your Cloud Function to read and write to Firestore, etc.
// When deployed, it automatically picks up the project configuration.
admin.initializeApp();

// This Cloud Function is named 'deleteRoomAndSubcollections'.
// It's triggered whenever a document is DELETED from the 'rooms' collection.
// The '{roomId}' is a wildcard that captures the ID of the deleted room document.
exports.deleteRoomAndSubcollections = onDocumentDeleted("rooms/{roomId}", async (event) => {
  // Get the ID of the room document that was just deleted.
  // In V2, the wildcard parameters are found in event.params
  const roomId = event.params.roomId;
  // Get a reference to the Firestore database.
  const db = admin.firestore();

  logger.info(`Cloud Function triggered: Deleting subcollections for room: ${roomId}`, { roomId: roomId });

  const deletePromises = []; // Array to hold all deletion promises for all subcollections

  // --- Delete the 'players' subcollection ---
  async function deletePlayersSubcollection() {
    const playersRef = db.collection(`rooms/${roomId}/players`);
    const playersSnapshot = await playersRef.get();

    if (playersSnapshot.empty) {
      logger.info("No players subcollection found to delete.", { roomId: roomId });
    } else {
      logger.info(`Found ${playersSnapshot.size} documents in players subcollection for room: ${roomId}`);
      playersSnapshot.docs.forEach((doc) => {
        deletePromises.push(doc.ref.delete());
      });
    }
  }

  // --- Delete the 'activities' subcollection ---
  async function deleteActivitiesSubcollection() {
    const activitiesRef = db.collection(`rooms/${roomId}/activities`);
    const activitiesSnapshot = await activitiesRef.get();

    if (activitiesSnapshot.empty) {
      logger.info("No activities subcollection found to delete.", { roomId: roomId });
    } else {
      logger.info(`Found ${activitiesSnapshot.size} documents in activities subcollection for room: ${roomId}`);
      activitiesSnapshot.docs.forEach((doc) => {
        deletePromises.push(doc.ref.delete());
      });
    }
  }

  // Add more subcollection deletion functions here if you have them, e.g.:
  /*
  async function deleteChatsSubcollection() {
    const chatsRef = db.collection(`rooms/${roomId}/chats`);
    const chatsSnapshot = await chatsRef.get();
    if (!chatsSnapshot.empty) {
      logger.info(`Found ${chatsSnapshot.size} documents in chats subcollection for room: ${roomId}`);
      chatsSnapshot.docs.forEach(doc => {
        deletePromises.push(doc.ref.delete());
      });
    } else {
      logger.info("No chats subcollection found to delete.", { roomId: roomId });
    }
  }
  */

  // Execute all subcollection deletion functions concurrently
  await Promise.all([
    deletePlayersSubcollection(),
    deleteActivitiesSubcollection(),
    // Add calls to other subcollection deletion functions here if you create them
    // deleteChatsSubcollection(),
  ]);

  // After all subcollection documents are added to deletePromises, await them all.
  if (deletePromises.length > 0) {
    await Promise.all(deletePromises);
    logger.info(`Successfully deleted a total of ${deletePromises.length} subcollection documents for room: ${roomId}`);
  } else {
    logger.info(`No subcollection documents were found for deletion for room: ${roomId}`);
  }

  logger.info(`Finished processing subcollections for room: ${roomId}`);
  return null;
});
