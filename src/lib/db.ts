import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, CraftClass, Reservation, Order } from '../types';

// Products
export const productsCollection = collection(db, 'products');

// Classes
export const classesCollection = collection(db, 'classes');

// Reservations
export const reservationsCollection = collection(db, 'reservations');

// Orders
export const ordersCollection = collection(db, 'orders');

// Settings
export const settingsCollection = collection(db, 'settings');

// Initialize defaults if empty
export const initializeDefaults = async (
  initialProducts: Product[],
  initialClasses: CraftClass[],
  initialReservations: Reservation[],
  initialOrders: Order[]
) => {
  const productsSnap = await getDocs(productsCollection);
  if (productsSnap.empty) {
    for (const p of initialProducts) {
      await setDoc(doc(productsCollection, p.id), p);
    }
  }

  const classesSnap = await getDocs(classesCollection);
  if (classesSnap.empty) {
    for (const c of initialClasses) {
      await setDoc(doc(classesCollection, c.id), c);
    }
  }

  const settingsSnap = await getDoc(doc(settingsCollection, 'monthlyTitle'));
  if (!settingsSnap.exists()) {
    await setDoc(doc(settingsCollection, 'monthlyTitle'), { value: 'MONTHLY ITEMS' });
  }
};
