/**
 * Function to sleep; used to force server delay to verify suspense etc.
 */
export default function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}