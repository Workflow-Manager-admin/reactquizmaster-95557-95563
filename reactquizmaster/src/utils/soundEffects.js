/**
 * Sound utility functions for the QuizVerse application
 */

// Create audio objects for correct and incorrect sounds
let correctSound = null;
let incorrectSound = null;

/**
 * Initialize sound effects with URLs or base paths
 * @param {string} correctSoundPath - Path to correct answer sound
 * @param {string} incorrectSoundPath - Path to incorrect answer sound
 */
export const initSounds = () => {
  try {
    correctSound = new Audio("https://assets.mixkit.co/active_storage/sfx/223/223-preview.mp3");
    incorrectSound = new Audio("https://assets.mixkit.co/active_storage/sfx/227/227-preview.mp3");
    
    // Preload the sounds
    correctSound.load();
    incorrectSound.load();
    
    // Set volume
    correctSound.volume = 0.5;
    incorrectSound.volume = 0.5;
    
    return true;
  } catch (error) {
    console.error("Failed to initialize sounds:", error);
    return false;
  }
};

/**
 * Play the sound for a correct answer
 */
export const playCorrectSound = () => {
  try {
    if (correctSound) {
      correctSound.currentTime = 0;
      correctSound.play().catch(err => console.log("Sound playback prevented:", err));
    }
  } catch (error) {
    console.error("Error playing correct sound:", error);
  }
};

/**
 * Play the sound for an incorrect answer
 */
export const playIncorrectSound = () => {
  try {
    if (incorrectSound) {
      incorrectSound.currentTime = 0;
      incorrectSound.play().catch(err => console.log("Sound playback prevented:", err));
    }
  } catch (error) {
    console.error("Error playing incorrect sound:", error);
  }
};
