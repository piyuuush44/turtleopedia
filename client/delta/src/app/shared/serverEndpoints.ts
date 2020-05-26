import {environment} from '../../environments/environment';
// this is the generic url
const genericUrl = environment.apiUrl;

export const fbLogin = environment.webUrl + 'socialMediaRedirect/facebook';
export const googleLogin = environment.webUrl + 'socialMediaRedirect/google';

export const newBooking = genericUrl + 'newBooking';

export const loginUrl = genericUrl + 'login';
export const authSignIn = genericUrl + 'authlogin';
export const signupUrl = genericUrl + 'register';
export const fetchRoleUrl = genericUrl + 'get_all_roles';
export const fetchSingleRole = genericUrl + 'get_role';
export const getUserByMobile = genericUrl + 'getUserByMobile';

export const editRole = genericUrl + 'edit_user_roles';
export const editProfile = genericUrl + 'edit_profile';
export const changePassword = genericUrl + 'change_password';

// realestate routes
export const editrealestate = genericUrl + 'realestate/edit_realestate';
export const fetchrealestate = genericUrl + 'realestate/get_realestate';
export const uploadrealestateImages = genericUrl + 'realestate/upload_images';
export const saverealEstateProperty = genericUrl + 'realestate/save_property';
export const uploadrealestatePropertyImages = genericUrl + 'realestate/upload_property_images';
export const fetechrealestateProperties = genericUrl + 'realestate/fetch_all_properties';

// finance routes
export const editfinance = genericUrl + 'finance/edit_finance';
export const fetchfinance = genericUrl + 'finance/get_finance';
export const uploadfinanceImages = genericUrl + 'finance/upload_images';

// servicesuppliers routes
export const editservicesuppliers = genericUrl + 'servicesuppliers/edit_servicesuppliers';
export const fetchservicesuppliers = genericUrl + 'servicesuppliers/get_servicesuppliers';
export const uploadservicesuppliersImages = genericUrl + 'servicesuppliers/upload_images';

// travel curator routes
export const edittravelcurator = genericUrl + 'travelcurator/edit_travelcurator';
export const fetchtravelcurator = genericUrl + 'travelcurator/get_travelcurator';
export const uploadtravelcuratorImages = genericUrl + 'travelcurator/upload_images';

// travel agent routes
export const edittravelagent = genericUrl + 'travelagent/edit_travelagent';
export const fetchtravelagent = genericUrl + 'travelagent/get_travelagent';
export const uploadtravelagentImages = genericUrl + 'travelagent/upload_images';

// properties routes
export const editProperties = genericUrl + 'properties/edit_properties';
export const fetchProperties = genericUrl + 'properties/get_properties';
export const uploadPropertiesImages = genericUrl + 'properties/upload_images';

// transportation routes
export const editTransportation = genericUrl + 'transportation/edit_transportation';
export const fetchTransportation = genericUrl + 'transportation/get_transportation';
export const saveVehicles = genericUrl + 'transportation/save_vehicles';
export const fetchVehicles = genericUrl + 'transportation/fetch_vehicles';
export const uploadTransportationImages = genericUrl + 'transportation/upload_images';
export const uploadVehicleImages = genericUrl + 'transportation/upload_vehicle_images';

export const sendOtp = genericUrl + 'send_otp';
export const verifyOtp = genericUrl + 'verify_otp';

// upload urls
export const uploadProfileImages = genericUrl + 'upload_profile_images';

// jobs urls
export const newJob = genericUrl + 'jobs/new_job';
export const fetchJobByUser = genericUrl + 'jobs/get_by_user';
export const editJob = genericUrl + 'jobs/edit_job';

// treks url
export const saveTrek = genericUrl + 'treks/save_trek';
export const fetchTreks = genericUrl + 'treks/fetch_by_user';
export const uploadTrekImage = genericUrl + 'treks/upload_image';
export const trekQuery = genericUrl + 'treks/trek_query';
export const trekDetails = genericUrl + 'treks/trek_details';
export const trekPricing = genericUrl + 'treks/getTrekPricing';

// road trip url
export const saveRTrip = genericUrl + 'RTrips/save_RTrip';
export const fetchRTrips = genericUrl + 'RTrips/fetch_by_user';
export const uploadRTripImage = genericUrl + 'RTrips/upload_image';
export const RTripQuery = genericUrl + 'RTrips/RTrip_query';
export const RTripDetails = genericUrl + 'RTrips/RTrip_details';
export const RTripPricing = genericUrl + 'RTrips/getRTripPricing';

// events url
export const saveEvent = genericUrl + 'events/save_event';
export const fetchEvents = genericUrl + 'events/fetch_by_user';
export const uploadEventImage = genericUrl + 'events/upload_image';
export const eventQuery = genericUrl + 'events/event_query';
export const eventDetails = genericUrl + 'events/event_details';
export const eventPricing = genericUrl + 'events/getEventPricing';


// festival calendar url
export const saveFestivalCalendar = genericUrl + 'FestivalCalendar/save_FestivalCalendar';
export const fetchFestivalCalendar = genericUrl + 'FestivalCalendar/fetch_by_user';
export const uploadFestivalCalendarImage = genericUrl + 'FestivalCalendar/upload_image';
export const FestivalCalendarQuery = genericUrl + 'FestivalCalendar/FestivalCalendar_query';
export const FestivalCalendarDetails = genericUrl + 'FestivalCalendar/FestivalCalendar_details';
export const FestivalCalendarPricing = genericUrl + 'FestivalCalendar/getFestivalCalendarPricing';


export const contactUs = genericUrl + 'contact_us';
export const getBookings = genericUrl + 'getBookings';
