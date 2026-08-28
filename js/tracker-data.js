/* ==========================================================================
   CONSIGNMENT TRACKING DATA & SIMULATION ENGINE
   ========================================================================== */

const TRACKING_DATABASE = {
  "MVP-8842": {
    trackingId: "MVP-8842",
    sender: "Ramesh Sharma",
    origin: "Varanasi (UP)",
    destination: "Delhi NCR (Noida)",
    bookingDate: "24 Aug 2026",
    expectedDelivery: "27 Aug 2026",
    status: "In Transit",
    currentLocation: "Kanpur Highway Toll (En Route to Delhi)",
    driverName: "Vikram Singh (Verified)",
    driverPhone: "+91 80100 41007",
    vehicleNumber: "UP 65 BT 4921 (Container Truck)",
    progressPercent: 70,
    steps: [
      { title: "Booking & Survey Confirmed", date: "24 Aug, 10:30 AM", location: "Varanasi Hub", done: true },
      { title: "Multi-Layer Packing & Loading", date: "24 Aug, 04:00 PM", location: "Customer Residence, Varanasi", done: true },
      { title: "Dispatched from Main Hub", date: "25 Aug, 06:30 AM", location: "Varanasi Logistics Center", done: true },
      { title: "In Transit (Live GPS Active)", date: "25 Aug, 08:45 PM", location: "Kanpur Bypass", done: true, current: true },
      { title: "Arrival at Noida Local Hub", date: "27 Aug (Expected)", location: "Sector 62, Noida", done: false },
      { title: "Out for Delivery & Unpacking", date: "27 Aug (Expected)", location: "Destination Residence", done: false }
    ]
  },
  "MVP-2024": {
    trackingId: "MVP-2024",
    sender: "Ananya Mishra",
    origin: "Mirzapur (UP)",
    destination: "Bengaluru (Karnataka)",
    bookingDate: "22 Aug 2026",
    expectedDelivery: "28 Aug 2026",
    status: "In Transit",
    currentLocation: "Nagpur Central Highway",
    driverName: "Santosh Yadav",
    driverPhone: "+91 80100 41007",
    vehicleNumber: "UP 63 AF 8109 (Dedicated Carrier)",
    progressPercent: 50,
    steps: [
      { title: "Booking Confirmed", date: "22 Aug, 11:00 AM", location: "Mirzapur Office", done: true },
      { title: "Wooden Crating & Bubble Packing", date: "22 Aug, 05:00 PM", location: "Mirzapur", done: true },
      { title: "Dispatched to South Corridor", date: "23 Aug, 08:00 AM", location: "Prayagraj Transit Hub", done: true },
      { title: "Crossing Nagpur Express Checkpoint", date: "25 Aug, 02:15 PM", location: "Nagpur, MH", done: true, current: true },
      { title: "Hyderabad Transit Checkpoint", date: "26 Aug (Expected)", location: "Hyderabad", done: false },
      { title: "Final Delivery & Assembly in Bengaluru", date: "28 Aug (Expected)", location: "Whitefield, Bengaluru", done: false }
    ]
  },
  "MVP-7711": {
    trackingId: "MVP-7711",
    sender: "Deepak Verma",
    origin: "Lucknow (UP)",
    destination: "Mumbai (Maharashtra)",
    bookingDate: "21 Aug 2026",
    expectedDelivery: "25 Aug 2026",
    status: "Delivered Successfully",
    currentLocation: "Andheri West, Mumbai (Completed)",
    driverName: "Mohan Lal",
    driverPhone: "+91 80100 41007",
    vehicleNumber: "MH 04 CZ 3012",
    progressPercent: 100,
    steps: [
      { title: "Order Booked", date: "21 Aug, 09:00 AM", location: "Lucknow", done: true },
      { title: "Packed & Sealed", date: "21 Aug, 02:30 PM", location: "Gomti Nagar, Lucknow", done: true },
      { title: "Dispatched", date: "21 Aug, 09:00 PM", location: "Lucknow Hub", done: true },
      { title: "Arrived at Mumbai Gateway", date: "24 Aug, 07:00 AM", location: "Bhiwandi Hub", done: true },
      { title: "Delivered & Unpacked with 100% Safety", date: "25 Aug, 01:30 PM", location: "Customer Residence, Mumbai", done: true, current: true }
    ]
  }
};

// Generate on-the-fly tracking for any query ID
function getConsignmentDetails(id) {
  const cleanId = (id || '').trim().toUpperCase();
  if (TRACKING_DATABASE[cleanId]) {
    return TRACKING_DATABASE[cleanId];
  }
  
  // Return dynamically simulated tracking for any realistic custom ID
  return {
    trackingId: cleanId || "MVP-LIVE",
    sender: "Verified Consignment",
    origin: "Pickup City Hub",
    destination: "Destination City Hub",
    bookingDate: "Recent Booking",
    expectedDelivery: "In 2-4 Days",
    status: "In Transit (Live GPS On)",
    currentLocation: "National Highway FastTag Transit Corridor",
    driverName: "Assigned Senior Fleet Pilot",
    driverPhone: "+91 80100 41007",
    vehicleNumber: "GPS-Monitored Closed Container",
    progressPercent: 65,
    steps: [
      { title: "Booking & Goods Inspection Completed", date: "Step 1 Done", location: "Pickup Point", done: true },
      { title: "Multi-Layered Safety Bubble Packing", date: "Step 2 Done", location: "Source Address", done: true },
      { title: "Loaded & Dispatched with Insurance", date: "Step 3 Done", location: "Regional Express Hub", done: true },
      { title: "Vehicle on Highway with Live GPS", date: "Live Now", location: "En Route to Destination", done: true, current: true },
      { title: "Arrival at City Hub", date: "Scheduled", location: "Local Depot", done: false },
      { title: "Safe Delivery & Furniture Placement", date: "Scheduled", location: "Drop Location", done: false }
    ]
  };
}
