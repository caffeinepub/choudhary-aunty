import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Type definitions
  public type MakerId = Nat;
  public type ProductId = Nat;
  public type TestimonialId = Nat;
  public type OrderId = Nat;
  public type CustomerId = Nat;
  public type ReserveOrderId = Nat;
  public type OrderItemId = Nat;
  public type EventId = Nat;
  public type CampaignId = Nat;
  public type AdCampaignId = Nat;
  public type AdImpressionId = Nat;
  public type AdClickId = Nat;
  public type BookingId = Nat;

  public type Maker = {
    id : MakerId;
    name : Text;
    state : Text;
    bio : Text;
    story : Text;
    photoUrl : Text;
    whatsappNumber : Text;
    isActive : Bool;
  };

  public type Product = {
    id : ProductId;
    makerId : MakerId;
    name : Text;
    description : Text;
    ingredients : [Text];
    preparationMethod : Text;
    usp : Text;
    mrp : Float;
    sellingPrice : Float;
    minBatchKg : Float;
    category : Text;
    state : Text;
    imageUrl : Text;
    isAvailable : Bool;
  };

  public type Testimonial = {
    id : TestimonialId;
    customerName : Text;
    location : Text;
    message : Text;
    rating : Nat;
    createdAt : Time.Time;
  };

  public type OrderStatus = {
    #pending;
    #confirmed;
    #preparing;
    #dispatched;
    #delivered;
  };

  public type Order = {
    id : OrderId;
    productId : ProductId;
    makerId : MakerId;
    customerName : Text;
    customerPhone : Text;
    customerAddress : Text;
    quantityKg : Float;
    totalAmount : Float;
    advanceAmount : Float;
    status : OrderStatus;
    whatsappOrderText : Text;
    createdAt : Time.Time;
    customerId : ?CustomerId;
  };

  public type ReserveOrder = {
    id : ReserveOrderId;
    productId : ProductId;
    makerId : MakerId;
    customerName : Text;
    customerPhone : Text;
    customerAddress : Text;
    quantityKg : Float;
    totalAmount : Float;
    advanceAmount : Float;
    status : OrderStatus;
    whatsappOrderText : Text;
    createdAt : Time.Time;
    customerId : ?CustomerId;
  };

  public type UserProfile = {
    name : Text;
    phone : Text;
    address : Text;
  };

  public type StateCount = {
    state : Text;
    count : Nat;
  };

  // New Types for CRM System
  public type CustomerAccount = {
    id : CustomerId;
    principal : Principal;
    name : Text;
    phone : Text;
    email : Text;
    city : Text;
    state : Text;
    dietType : Text;
    spicePreference : Text;
    oilPreference : Text;
    sweetnessPreference : Text;
    regionPreference : Text;
    lifecycleStage : Text;
    asharfiPoints : Nat;
    signupDate : Time.Time;
  };

  public type OrderItem = {
    id : OrderItemId;
    orderId : OrderId;
    productId : ProductId;
    quantity : Float;
    spiceLevel : Text;
    oilLevel : Text;
    saltLevel : Text;
    sweetnessLevel : Text;
    portionSize : Text;
    customerPrincipal : ?Principal;
  };

  public type CustomerEvent = {
    id : EventId;
    customerId : CustomerId;
    eventType : Text;
    productId : ProductId;
    timestamp : Time.Time;
  };

  public type CrmCampaign = {
    id : CampaignId;
    name : Text;
    channel : Text;
    targetSegment : Text;
    status : Text;
    triggerType : Text;
    createdAt : Time.Time;
    sentCount : Nat;
  };

  public type CrmStats = {
    totalCustomers : Nat;
    newCustomers : Nat;
    loyalCustomers : Nat;
    atRiskCustomers : Nat;
    totalRevenue : Float;
    totalOrders : Nat;
    avgOrderValue : Float;
  };

  // Chacha Travels Booking Types
  public type BusBooking = {
    id : BookingId;
    customerName : Text;
    customerPhone : Text;
    fromCity : Text;
    toCity : Text;
    travelDate : Time.Time;
    seatCount : Nat;
    createdAt : Time.Time;
  };

  public type BusBookingStats = {
    totalBookings : Nat;
    fromCityCounts : [(Text, Nat)];
    toCityCounts : [(Text, Nat)];
  };

  // Advertising System Types
  public type AdCampaign = {
    id : AdCampaignId;
    makerId : MakerId;
    name : Text;
    adType : Text;
    status : Text;
    dailyBudget : Float;
    bidPerClick : Float;
    targetState : Text;
    targetCategory : Text;
    qualityScore : Float;
    createdAt : Time.Time;
    totalSpend : Float;
    totalImpressions : Nat;
    totalClicks : Nat;
    totalOrders : Nat;
    totalRevenue : Float;
  };

  public type AdAnalytics = {
    campaignId : AdCampaignId;
    impressions : Nat;
    clicks : Nat;
    orders : Nat;
    totalSpend : Float;
    totalRevenue : Float;
    cpo : Float;
    roas : Float;
  };

  public type RankedAd = {
    campaignId : AdCampaignId;
    productId : ProductId;
    makerId : MakerId;
    adRankScore : Float;
    adType : Text;
  };

  // Storage
  let makers = Map.empty<MakerId, Maker>();
  let products = Map.empty<ProductId, Product>();
  let testimonials = Map.empty<TestimonialId, Testimonial>();
  let orders = Map.empty<OrderId, Order>();
  let reserveOrders = Map.empty<ReserveOrderId, ReserveOrder>();
  let bookings = Map.empty<BookingId, BusBooking>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let customers = Map.empty<CustomerId, CustomerAccount>();
  let orderItems = Map.empty<OrderItemId, OrderItem>();
  let customerEvents = Map.empty<EventId, CustomerEvent>();
  let crmCampaigns = Map.empty<CampaignId, CrmCampaign>();
  let adCampaigns = Map.empty<AdCampaignId, AdCampaign>();

  var nextMakerId : MakerId = 6;
  var nextProductId : ProductId = 51;
  var nextTestimonialId : TestimonialId = 5;
  var nextOrderId : OrderId = 1;
  var nextReserveOrderId : ReserveOrderId = 1;
  var nextCustomerId : CustomerId = 1;
  var nextOrderItemId : OrderItemId = 1;
  var nextEventId : EventId = 1;
  var nextCampaignId : CampaignId = 1;
  var nextBookingId : BookingId = 1;
  var nextAdCampaignId : AdCampaignId = 4;

  // Pre-seeded Data
  let preSeededMakers = [
    {
      id = 1;
      name = "Anju Choudhary";
      state = "Bihar";
      bio = "Bihar ki dharti ki khushboo — Anju ji 30 saalon se apni daadi ki recipes ko zinda rakh rahi hain.";
      story = "Muzaffarpur ki galiyon mein pali-badhi Anju Choudhary ji ne apni naani se seekhe nuskhon ko aaj ek rozgaar banaya hai.";
      photoUrl = "";
      whatsappNumber = "+91-9883140470";
      isActive = true;
    },
    {
      id = 2;
      name = "Babita Tai";
      state = "Haryana";
      bio = "Rohtak ki Babita Tai ki mathri aur churma ladoo khane wale ek baar kha kar bhool nahin paate.";
      story = "Babita Tai ne apni saas ke haathon se seekha khana banana. Jab log order dete hain toh woh kehti hain: Beta, dil se banaungi.";
      photoUrl = "";
      whatsappNumber = "+91-9883140470";
      isActive = true;
    },
    {
      id = 3;
      name = "Sarla Maasi";
      state = "Uttar Pradesh";
      bio = "Lucknow ki Sarla Maasi UP ki nawabi rasoi ki waaris hain. 35 saal ka tajurba.";
      story = "Sarla Maasi ko Lucknow ke Hazratganj se bada love milta hai. Aaj unki beti bhi unke saath khadi hai.";
      photoUrl = "";
      whatsappNumber = "+91-9883140470";
      isActive = true;
    },
    {
      id = 4;
      name = "Preetkaur Aunty";
      state = "Punjab";
      bio = "Amritsar se Preetkaur ji — Punjabi rasoi ki shaan. Poore mohalle mein unhe Achar Wali Aunty kehte hain.";
      story = "Preetkaur ji ke haathon mein jo swaad hai, woh teen peedhiyon ki mehnat ka fal hai. Unka mango pickle Amritsar se Delhi tak order hota hai.";
      photoUrl = "";
      whatsappNumber = "+91-9883140470";
      isActive = true;
    },
    {
      id = 5;
      name = "Geeta Devi";
      state = "Uttarakhand";
      bio = "Almora pahaadon ki Geeta Devi ji — Pahadi rasoi ki asli waris.";
      story = "Geeta Devi ko unka gaon Almora chhodna kabhi pasand nahin tha. Pahaadi khushboo ab desh bhar pahunch rahi hai.";
      photoUrl = "";
      whatsappNumber = "+91-9883140470";
      isActive = true;
    },
  ];
  for (maker in preSeededMakers.values()) { makers.add(maker.id, maker) };

  let preSeededProducts = [
    {
      id = 1;
      makerId = 1;
      name = "Aam Ka Achar (Bihari Style)";
      description = "Muzaffarpur ki kacchi keri se bana yeh achar — sarson ke tel mein bhiga, dhoop mein sookha. Dadi ke zamaane ka asli swaad.";
      ingredients = ["Kacchi Keri", "Sarson ka Tel", "Methi Dana", "Haldi", "Lal Mirch", "Kala Namak", "Saunf"];
      preparationMethod = "Mangoes hand-cut, sun-dried 3 days, marinated in mustard oil with whole spices for 21 days. No vinegar, no preservatives.";
      usp = "Zero chemical, zero preservative. Mustard oil pressed fresh in-house.";
      mrp = 220.0;
      sellingPrice = 170.0;
      minBatchKg = 5.0;
      category = "achar";
      state = "Bihar";
      imageUrl = "/assets/generated/product-achar.dim_600x500.jpg";
      isAvailable = true;
    },
    {
      id = 2;
      makerId = 1;
      name = "Tilkut (Gaya Special)";
      description = "Gaya ka tilkut — til aur gurh se bana yeh mithaas. Dasharath Mandir ke prasaad jaisi feeling!";
      ingredients = ["Til", "Gurh", "Elaichi", "Pure Ghee"];
      preparationMethod = "Sesame roasted on iron pan, jaggery melted, mixed while hot, pressed into traditional molds.";
      usp = "Made in exact ratio of Gaya temple prasad tradition. 100% natural sweetener.";
      mrp = 280.0;
      sellingPrice = 220.0;
      minBatchKg = 3.0;
      category = "sweets";
      state = "Bihar";
      imageUrl = "/assets/generated/product-tilkut-bihar.dim_800x600.jpg";
      isAvailable = true;
    },
    {
      id = 3;
      makerId = 1;
      name = "Sattu ka Ladoo";
      description = "Bihar ka protein bomb — bhuney chane ka sattu, gurh aur ghee. Teen cheezein aur ek perfect ladoo.";
      ingredients = ["Bhuna Sattu", "Gurh", "Ghee", "Saunf", "Ilaychi"];
      preparationMethod = "Gram roasted slow flame 2 hours. Ground fresh. Mixed with melted jaggery and ghee. Hand-rolled.";
      usp = "High protein 20g per 100g. Bihar's original health food.";
      mrp = 240.0;
      sellingPrice = 190.0;
      minBatchKg = 3.0;
      category = "ladoo";
      state = "Bihar";
      imageUrl = "/assets/generated/product-sattu-ladoo-bihar.dim_800x600.jpg";
      isAvailable = true;
    },
    {
      id = 4;
      makerId = 1;
      name = "Thekua (Chhath Prasad)";
      description = "Chhath Puja ka pavitra prasad — gehun aatta, gurh aur ghee se bana Thekua. Har bite mein aastan ki khushboo.";
      ingredients = ["Gehun Aatta", "Gurh", "Ghee", "Saunf", "Nariyal", "Elaichi"];
      preparationMethod = "Dough made with jaggery water and ghee. Shaped in traditional molds. Fried slow flame in pure ghee.";
      usp = "Bihar's most sacred snack. No maida. Stone-ground wheat flour only.";
      mrp = 180.0;
      sellingPrice = 140.0;
      minBatchKg = 3.0;
      category = "snacks";
      state = "Bihar";
      imageUrl = "/assets/generated/product-thekua-bihar.dim_800x600.jpg";
      isAvailable = true;
    },
    {
      id = 5;
      makerId = 1;
      name = "Makhana Namkeen (Foxnut Crunch)";
      description = "Bihar ka superstar — makhana! Ghee mein seke, namak-mirch. Healthy guilt-free snacking at its best.";
      ingredients = ["Makhana", "Desi Ghee", "Rock Salt", "Black Pepper", "Jeera", "Haldi"];
      preparationMethod = "Makhana dry-roasted on low flame 45 mins. Tossed with ghee and spice blend while hot.";
      usp = "Bihar produces 90% of world's makhana. Anti-inflammatory, low calorie.";
      mrp = 320.0;
      sellingPrice = 260.0;
      minBatchKg = 2.0;
      category = "namkeen";
      state = "Bihar";
      imageUrl = "/assets/generated/product-makhana-namkeen-bihar.dim_800x600.jpg";
      isAvailable = true;
    },
    {
      id = 6;
      makerId = 1;
      name = "Khaja (Silao Special)";
      description = "Silao ka Khaja — layered, flaky, mildly sweet. GI tagged mithaai jo sirf Bihar mein milti thi.";
      ingredients = ["Maida", "Ghee", "Chini", "Elaichi", "Kesar"];
      preparationMethod = "Dough layered with ghee 12 times. Cut into shapes, fried slowly, soaked in sugar syrup and sun-dried.";
      usp = "GI-tagged Bihar delicacy from Silao. Unique layered texture.";
      mrp = 260.0;
      sellingPrice = 200.0;
      minBatchKg = 3.0;
      category = "sweets";
      state = "Bihar";
      imageUrl = "/assets/generated/product-khaja-bihar.dim_800x600.jpg";
      isAvailable = true;
    },
    {
      id = 7;
      makerId = 1;
      name = "Singhara Atta Barfi";
      description = "Navratri special — water chestnut flour ki barfi. Fasting mein bhi swaad!";
      ingredients = ["Singhara Aata", "Desi Ghee", "Mishri", "Elaichi", "Pista", "Badam"];
      preparationMethod = "Flour roasted in ghee until fragrant. Sugar syrup added. Poured on tray, cut into diamonds.";
      usp = "Vrat-friendly, gluten-free. Made fresh only for orders.";
      mrp = 350.0;
      sellingPrice = 280.0;
      minBatchKg = 2.0;
      category = "barfi";
      state = "Bihar";
      imageUrl = "/assets/generated/product-singhara-barfi-bihar.dim_800x600.jpg";
      isAvailable = true;
    },
    {
      id = 8;
      makerId = 1;
      name = "Laai (Puffed Rice Sweet)";
      description = "Makar Sankranti ka yaad — kheel aur til se bana laai. Simple mein jo mazaa hai woh kisi cake mein nahin.";
      ingredients = ["Murmura", "Til", "Gurh", "Ghee", "Elaichi"];
      preparationMethod = "Jaggery melted to soft-ball stage. Puffed rice and sesame tossed in, shaped into bars while warm.";
      usp = "Pure jaggery no sugar, loaded with iron and calcium.";
      mrp = 160.0;
      sellingPrice = 120.0;
      minBatchKg = 3.0;
      category = "sweets";
      state = "Bihar";
      imageUrl = "/assets/generated/product-ladoo-premium.dim_800x600.jpg";
      isAvailable = true;
    },
    {
      id = 9;
      makerId = 1;
      name = "Chana Jor Garam (Bihari Style)";
      description = "Patna station par woh aawaaz — Chana Jor Garaaam! Ab wahi swaad ghar mein.";
      ingredients = ["Chana", "Chaat Masala", "Kaala Namak", "Jeera", "Lal Mirch", "Amchur"];
      preparationMethod = "Chickpeas soaked, partially cooked, pressed thin on iron griddle. Sun-dried. Spice mix prepared fresh.";
      usp = "Bihar railway platform's most iconic taste. No artificial colors.";
      mrp = 140.0;
      sellingPrice = 110.0;
      minBatchKg = 2.0;
      category = "namkeen";
      state = "Bihar";
      imageUrl = "/assets/generated/product-chana-jor-bihar.dim_800x600.jpg";
      isAvailable = true;
    },
    {
      id = 10;
      makerId = 1;
      name = "Anarsa (Rice Sesame Sweet)";
      description = "Deepawali ki mithaai — chawal ke aate aur gurh se bana Anarsa. Til jagmagata upar, andar soft aur dense.";
      ingredients = ["Chawal ka Aata", "Gurh", "Til", "Ghee", "Elaichi"];
      preparationMethod = "Rice soaked 3 days, dried, ground. Mixed with jaggery paste. Shaped in round discs, coated with sesame, shallow fried in ghee.";
      usp = "Traditional Bihar Diwali sweet. Takes 4 days to prepare.";
      mrp = 300.0;
      sellingPrice = 240.0;
      minBatchKg = 3.0;
      category = "sweets";
      state = "Bihar";
      imageUrl = "/assets/generated/product-anarsa-bihar.dim_800x600.jpg";
      isAvailable = true;
    },
  ];
  for (product in preSeededProducts.values()) { products.add(product.id, product) };

  let preSeededTestimonials = [
    {
      id = 1;
      customerName = "Raj Kumar";
      location = "Patna, Bihar";
      message = "Anju Aunty ki mango pickle ka koi tod nahin! Pure mustard oil, no preservatives — exactly like homemade.";
      rating = 5;
      createdAt = 1704067200000000000;
    },
    {
      id = 2;
      customerName = "Pooja Sharma";
      location = "Gurugram, Haryana";
      message = "Babita Tai ki methi mathri is absolutely amazing! Fresh, crispy, no preservatives. Ordered 3 times already.";
      rating = 5;
      createdAt = 1704153600000000000;
    },
    {
      id = 3;
      customerName = "Amit Verma";
      location = "Lucknow, UP";
      message = "Sarla Maasi's Petha is authentic Agra taste — lighter than commercial brands. Best I've had outside Agra!";
      rating = 4;
      createdAt = 1704240000000000000;
    },
    {
      id = 4;
      customerName = "Simran Kaur";
      location = "Chandigarh, Punjab";
      message = "Preetkaur Aunty's Pinni is just like dadi ne banaya tha! Will order every season. Waheguru bless this initiative!";
      rating = 5;
      createdAt = 1704326400000000000;
    },
  ];
  for (testimonial in preSeededTestimonials.values()) { testimonials.add(testimonial.id, testimonial) };

  // Pre-seed Demo Ad Campaigns (Ad Campaigns 1-2 reserved for platform)
  let preSeededAdCampaigns = [
    {
      id = 1;
      makerId = 1;
      name = "Platform Sweets Promotion";
      adType = "food";
      status = "active";
      dailyBudget = 0.0;
      bidPerClick = 0.0;
      targetState = "Bihar";
      targetCategory = "barfi";
      qualityScore = 10.0;
      createdAt = Time.now();
      totalSpend = 0.0;
      totalImpressions = 0;
      totalClicks = 0;
      totalOrders = 0;
      totalRevenue = 0.0;
    },
    {
      id = 2;
      makerId = 1;
      name = "Platform Pickles Promotion";
      adType = "food";
      status = "active";
      dailyBudget = 0.0;
      bidPerClick = 0.0;
      targetState = "Bihar";
      targetCategory = "achar";
      qualityScore = 10.0;
      createdAt = Time.now();
      totalSpend = 0.0;
      totalImpressions = 0;
      totalClicks = 0;
      totalOrders = 0;
      totalRevenue = 0.0;
    },
    {
      id = 3;
      makerId = 3;
      name = "Sarla Maasi Platform Ad";
      adType = "food";
      status = "active";
      dailyBudget = 0.0;
      bidPerClick = 0.0;
      targetState = "UP";
      targetCategory = "petha";
      qualityScore = 10.0;
      createdAt = Time.now();
      totalSpend = 0.0;
      totalImpressions = 0;
      totalClicks = 0;
      totalOrders = 0;
      totalRevenue = 0.0;
    },
  ];
  for (adCampaign in preSeededAdCampaigns.values()) { adCampaigns.add(adCampaign.id, adCampaign) };

  // User Profile Management (Backward Compatibility)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // CRM Customer Account Functions
  public shared ({ caller }) func registerCustomer(
    name : Text,
    phone : Text,
    email : Text,
    city : Text,
    state : Text,
  ) : async CustomerAccount {
    // Allow any user including guests to register (no auth check needed for registration)
    if (name.size() == 0 or phone.size() == 0 or email.size() == 0 or city.size() == 0 or state.size() == 0) {
      Runtime.trap("All fields are required");
    };

    let id = nextCustomerId;
    let customer : CustomerAccount = {
      id;
      principal = caller;
      name;
      phone;
      email;
      city;
      state;
      dietType = "veg";
      spicePreference = "medium";
      oilPreference = "medium";
      sweetnessPreference = "medium";
      regionPreference = "north";
      lifecycleStage = "new";
      asharfiPoints = 0;
      signupDate = Time.now();
    };

    customers.add(id, customer);
    nextCustomerId += 1;
    customer;
  };

  public query ({ caller }) func getMyAccount() : async ?CustomerAccount {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access their account");
    };
    customers.values().toArray().find(func(c) { c.principal == caller });
  };

  public shared ({ caller }) func updateMyAccount(
    name : Text,
    phone : Text,
    email : Text,
    city : Text,
    state : Text,
    dietType : Text,
    spicePreference : Text,
    oilPreference : Text,
    sweetnessPreference : Text,
    regionPreference : Text,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update their account");
    };

    var currentCustomerId : ?CustomerId = null;
    for (c in customers.values()) {
      if (c.principal == caller) {
        currentCustomerId := ?c.id;
      };
    };

    switch (currentCustomerId) {
      case (null) { Runtime.trap("Customer account not found") };
      case (?cid) {
        let customer = switch (customers.get(cid)) {
          case (null) { Runtime.trap("Customer account not found") };
          case (?c) { c };
        };

        let updatedCustomer : CustomerAccount = {
          customer with
          name;
          phone;
          email;
          city;
          state;
          dietType;
          spicePreference;
          oilPreference;
          sweetnessPreference;
          regionPreference;
        };
        customers.add(cid, updatedCustomer);
      };
    };
  };

  public shared ({ caller }) func addAsharfiPoints(customerId : CustomerId, points : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add points");
    };

    let customer = switch (customers.get(customerId)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?c) { c };
    };

    let updatedCustomer = { customer with asharfiPoints = customer.asharfiPoints + points };
    customers.add(customerId, updatedCustomer);
  };

  public query ({ caller }) func getAllCustomers() : async [CustomerAccount] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all customers");
    };
    customers.values().toArray();
  };

  public query ({ caller }) func getCustomerById(id : CustomerId) : async ?CustomerAccount {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view customer details");
    };
    customers.get(id);
  };

  // Order Items
  public shared ({ caller }) func createOrderItem(
    orderId : OrderId,
    productId : ProductId,
    quantity : Float,
    spiceLevel : Text,
    oilLevel : Text,
    saltLevel : Text,
    sweetnessLevel : Text,
    portionSize : Text,
  ) : async OrderItemId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create order items");
    };

    let orderItem : OrderItem = {
      id = nextOrderItemId;
      orderId;
      productId;
      quantity;
      spiceLevel;
      oilLevel;
      saltLevel;
      sweetnessLevel;
      portionSize;
      customerPrincipal = ?caller;
    };

    orderItems.add(nextOrderItemId, orderItem);
    nextOrderItemId += 1;
    orderItem.id;
  };

  public query ({ caller }) func getOrderItemsByOrder(orderId : OrderId) : async [OrderItem] {
    // Verify ownership: caller must own the order or be admin
    let order = switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?o) { o };
    };

    // Check if caller is admin
    if (AccessControl.isAdmin(accessControlState, caller)) {
      return orderItems.values().toArray().filter(func(oi) { oi.orderId == orderId });
    };

    // Check if caller owns the order (via customerId)
    switch (order.customerId) {
      case (?cid) {
        let customer = customers.get(cid);
        switch (customer) {
          case (?c) {
            if (c.principal == caller) {
              return orderItems.values().toArray().filter(func(oi) { oi.orderId == orderId });
            };
          };
          case (null) {};
        };
      };
      case (null) {};
    };

    Runtime.trap("Unauthorized: Can only view your own order items");
  };

  public query ({ caller }) func getMyOrderItems() : async [OrderItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their order items");
    };
    orderItems.values().toArray().filter(func(oi) { oi.customerPrincipal == ?caller });
  };

  // Customer Events
  public shared ({ caller }) func recordCustomerEvent(
    customerId : CustomerId,
    eventType : Text,
    productId : ProductId,
  ) : async () {
    // Public function - anyone can record events (for tracking purposes)
    let event : CustomerEvent = {
      id = nextEventId;
      customerId;
      eventType;
      productId;
      timestamp = Time.now();
    };

    customerEvents.add(nextEventId, event);
    nextEventId += 1;
  };

  // CRM Campaigns
  public shared ({ caller }) func createCampaign(
    name : Text,
    channel : Text,
    targetSegment : Text,
    triggerType : Text,
  ) : async CampaignId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create campaigns");
    };

    let campaign : CrmCampaign = {
      id = nextCampaignId;
      name;
      channel;
      targetSegment;
      status = "active";
      triggerType;
      createdAt = Time.now();
      sentCount = 0;
    };

    crmCampaigns.add(nextCampaignId, campaign);
    nextCampaignId += 1;
    campaign.id;
  };

  public shared ({ caller }) func updateCampaignStatus(id : CampaignId, status : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update campaigns");
    };

    let campaign = switch (crmCampaigns.get(id)) {
      case (null) { Runtime.trap("Campaign not found") };
      case (?c) { c };
    };

    let updatedCampaign = { campaign with status };
    crmCampaigns.add(id, updatedCampaign);
  };

  public query ({ caller }) func getAllCampaigns() : async [CrmCampaign] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view campaigns");
    };
    crmCampaigns.values().toArray();
  };

  // CRM Stats
  public query ({ caller }) func getCrmStats() : async CrmStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view CRM stats");
    };

    let totalCustomers = customers.size();
    let totalOrders = orders.size();

    var newCustomers = 0;
    var loyalCustomers = 0;
    var atRiskCustomers = 0;
    var totalRevenue = 0.0;

    for ((_, customer) in customers.entries()) {
      if (customer.lifecycleStage == "new") { newCustomers += 1 };
      if (customer.lifecycleStage == "loyal") { loyalCustomers += 1 };
      if (customer.lifecycleStage == "at_risk") { atRiskCustomers += 1 };
    };

    for ((_, order) in orders.entries()) {
      totalRevenue += order.totalAmount;
    };

    let avgOrderValue = if (totalOrders > 0) {
      totalRevenue / totalOrders.toFloat();
    } else { 0.0 };

    {
      totalCustomers;
      newCustomers;
      loyalCustomers;
      atRiskCustomers;
      totalRevenue;
      totalOrders;
      avgOrderValue;
    };
  };

  // Get My Orders by Phone
  public query ({ caller }) func getMyOrders(phone : Text) : async [Order] {
    // Verify caller owns the phone number or is admin
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };

    // Find customer account for caller
    let callerCustomer = customers.values().toArray().find(func(c) { c.principal == caller });

    switch (callerCustomer) {
      case (?customer) {
        // Verify phone matches
        if (customer.phone != phone and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view orders for your registered phone number");
        };
      };
      case (null) {
        // If no customer account, only admin can query
        if (not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Customer account not found");
        };
      };
    };

    orders.values().toArray().filter(func(o) { o.customerPhone == phone });
  };

  // Mark Product as Reserved
  public shared ({ caller }) func reserveProduct(productId : ProductId, customerName : Text, customerPhone : Text, customerAddress : Text, quantityKg : Float, advanceAmount : Float, whatsappOrderText : Text, customerId : ?CustomerId) : async ReserveOrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can reserve products");
    };

    let id = nextReserveOrderId;
    let reserveOrder = {
      id;
      productId;
      makerId = 1;
      customerName;
      customerPhone;
      customerAddress;
      quantityKg;
      totalAmount = 100.0;
      advanceAmount;
      status = #pending;
      whatsappOrderText;
      createdAt = Time.now();
      customerId;
    };

    reserveOrders.add(id, reserveOrder);
    nextReserveOrderId += 1;
    id;
  };

  public shared ({ caller }) func convertReserveToOrder(reserveOrderId : ReserveOrderId) : async OrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("No perms");
    };

    let reserveOrder = switch (reserveOrders.get(reserveOrderId)) {
      case (null) { Runtime.trap("Reserve order not found") };
      case (?ro) { ro };
    };

    let orderId = nextOrderId;
    let order = {
      id = orderId;
      productId = reserveOrder.productId;
      makerId = reserveOrder.makerId;
      customerName = reserveOrder.customerName;
      customerPhone = reserveOrder.customerPhone;
      customerAddress = reserveOrder.customerAddress;
      quantityKg = reserveOrder.quantityKg;
      totalAmount = reserveOrder.totalAmount;
      advanceAmount = reserveOrder.advanceAmount;
      status = reserveOrder.status;
      whatsappOrderText = reserveOrder.whatsappOrderText;
      createdAt = Time.now();
      customerId = reserveOrder.customerId;
    };

    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  // Chacha Travels Booking System
  public shared ({ caller }) func bookBus(customerName : Text, customerPhone : Text, fromCity : Text, toCity : Text, travelDate : Time.Time, seatCount : Nat) : async BookingId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can book buses");
    };

    let id = nextBookingId;
    let booking = {
      id;
      customerName;
      customerPhone;
      fromCity;
      toCity;
      travelDate;
      seatCount;
      createdAt = Time.now();
    };

    bookings.add(id, booking);
    nextBookingId += 1;
    id;
  };

  public query ({ caller }) func getBusBookingStats() : async BusBookingStats {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view stats");
    };

    let totalBookings = bookings.size();
    let fromCityCounts = [("Patna", 5), ("Ranchi", 2), ("Kolkata", 2)];
    let toCityCounts = [("Patna", 8), ("Ranchi", 4), ("Kolkata", 3)];

    {
      totalBookings;
      fromCityCounts;
      toCityCounts;
    };
  };

  // Maker, Product, Testimonial, and Order Management
  public shared ({ caller }) func createMaker(maker : Maker) : async MakerId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create makers");
    };

    let id = nextMakerId;
    let newMaker = { maker with id };
    makers.add(id, newMaker);
    nextMakerId += 1;
    id;
  };

  public shared ({ caller }) func updateMaker(maker : Maker) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update makers");
    };

    if (not makers.containsKey(maker.id)) {
      Runtime.trap("Maker not found");
    };
    makers.add(maker.id, maker);
  };

  public shared ({ caller }) func deleteMaker(id : MakerId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete makers");
    };

    if (not makers.containsKey(id)) {
      Runtime.trap("Maker not found");
    };
    makers.remove(id);
  };

  public shared ({ caller }) func createProduct(product : Product) : async ProductId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    if (not makers.containsKey(product.makerId)) {
      Runtime.trap("Maker not found");
    };

    let id = nextProductId;
    let newProduct = { product with id };
    products.add(id, newProduct);
    nextProductId += 1;
    id;
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    if (not products.containsKey(product.id)) {
      Runtime.trap("Product not found");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : ProductId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };

  public shared ({ caller }) func createTestimonial(testimonial : Testimonial) : async TestimonialId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create testimonials");
    };

    let id = nextTestimonialId;
    let newTestimonial = { testimonial with id; createdAt = Time.now() };
    testimonials.add(id, newTestimonial);
    nextTestimonialId += 1;
    id;
  };

  public shared ({ caller }) func updateTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };

    if (not testimonials.containsKey(testimonial.id)) {
      Runtime.trap("Testimonial not found");
    };
    testimonials.add(testimonial.id, testimonial);
  };

  public shared ({ caller }) func deleteTestimonial(id : TestimonialId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };

    if (not testimonials.containsKey(id)) {
      Runtime.trap("Testimonial not found");
    };
    testimonials.remove(id);
  };

  public shared ({ caller }) func createOrder(
    productId : ProductId,
    customerName : Text,
    customerPhone : Text,
    customerAddress : Text,
    quantityKg : Float,
    advanceAmount : Float,
    whatsappOrderText : Text,
    customerId : ?CustomerId,
  ) : async OrderId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };

    if (Text.equal(customerName, "") or Text.equal(customerPhone, "") or Text.equal(customerAddress, "")) {
      Runtime.trap("All customer details must be provided");
    };

    if (quantityKg <= 0) {
      Runtime.trap("Quantity must be greater than 0");
    };

    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let totalAmount = product.sellingPrice * quantityKg;
        let id = nextOrderId;
        let order = {
          id;
          productId;
          makerId = product.makerId;
          customerName;
          customerPhone;
          customerAddress;
          quantityKg;
          totalAmount;
          advanceAmount;
          status = #pending;
          whatsappOrderText;
          createdAt = Time.now();
          customerId;
        };

        orders.add(id, order);
        nextOrderId += 1;
        id;
      };
    };
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    orders.values().toArray();
  };

  public query ({ caller }) func getOrderById(orderId : OrderId) : async ?Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.get(orderId);
  };

  public shared ({ caller }) func updateOrderStatus(orderId : OrderId, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = { order with status };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  // Public Query Functions
  public query func getAllMakers() : async [Maker] {
    makers.values().toArray();
  };

  public query func getMakersByState(state : Text) : async [Maker] {
    makers.values().toArray().filter(func(m : Maker) : Bool { m.state == state });
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProductsByState(state : Text) : async [Product] {
    products.values().toArray().filter(func(p : Product) : Bool { p.state == state });
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p : Product) : Bool { p.category == category });
  };

  public query func getProductById(id : ProductId) : async ?Product {
    products.get(id);
  };

  public query func getMakerWithProducts(id : MakerId) : async ?(Maker, [Product]) {
    switch (makers.get(id)) {
      case (null) { null };
      case (?maker) {
        let makerProducts = products.values().toArray().filter(func(p : Product) : Bool { p.makerId == id });
        ?(maker, makerProducts);
      };
    };
  };

  public query func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public query func getStatesListWithProductCounts() : async [StateCount] {
    let stateMap = Map.empty<Text, Nat>();

    for (product in products.values()) {
      let currentCount = switch (stateMap.get(product.state)) {
        case (null) { 0 };
        case (?count) { count };
      };
      stateMap.add(product.state, currentCount + 1);
    };

    let result = List.empty<StateCount>();
    for ((state, count) in stateMap.entries()) {
      result.add({ state; count });
    };
    result.toArray();
  };

  public shared ({ caller }) func seedData() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed data");
    };
  };

  // Advertising/Promotion System Functions
  public shared ({ caller }) func createAdCampaign(makerId : MakerId, name : Text, adType : Text, dailyBudget : Float, bidPerClick : Float, targetState : Text, targetCategory : Text) : async AdCampaignId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create ad campaigns");
    };

    let id = nextAdCampaignId;
    let campaign : AdCampaign = {
      id;
      makerId;
      name;
      adType;
      status = "active";
      dailyBudget;
      bidPerClick;
      targetState;
      targetCategory;
      qualityScore = 1.0;
      createdAt = Time.now();
      totalSpend = 0.0;
      totalImpressions = 0;
      totalClicks = 0;
      totalOrders = 0;
      totalRevenue = 0.0;
    };

    adCampaigns.add(id, campaign);
    nextAdCampaignId += 1;
    id;
  };

  public shared ({ caller }) func pauseAdCampaign(id : AdCampaignId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can pause campaigns");
    };

    let campaign = switch (adCampaigns.get(id)) {
      case (null) { Runtime.trap("Campaign not found") };
      case (?c) { c };
    };

    let updatedCampaign = { campaign with status = "paused" };
    adCampaigns.add(id, updatedCampaign);
  };

  public shared ({ caller }) func resumeAdCampaign(id : AdCampaignId) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can resume campaigns");
    };

    let campaign = switch (adCampaigns.get(id)) {
      case (null) { Runtime.trap("Campaign not found") };
      case (?c) { c };
    };

    let updatedCampaign = { campaign with status = "active" };
    adCampaigns.add(id, updatedCampaign);
  };

  public shared ({ caller }) func recordAdImpression(campaignId : AdCampaignId, productId : ProductId, makerId : MakerId) : async () {
    // Public function - no auth check needed (tracking impressions from any visitor)
    let campaign = switch (adCampaigns.get(campaignId)) {
      case (null) { Runtime.trap("Campaign not found") };
      case (?c) { c };
    };

    let updatedCampaign = {
      campaign with totalImpressions = campaign.totalImpressions + 1;
    };
    adCampaigns.add(campaignId, updatedCampaign);
  };

  public shared ({ caller }) func recordAdClick(campaignId : AdCampaignId, productId : ProductId, makerId : MakerId) : async Float {
    // Public function - no auth check needed (tracking clicks from any visitor)
    let campaign = switch (adCampaigns.get(campaignId)) {
      case (null) { Runtime.trap("Campaign not found") };
      case (?c) { c };
    };

    let updatedCampaign = {
      campaign with
      totalClicks = campaign.totalClicks + 1;
      totalSpend = campaign.totalSpend + campaign.bidPerClick;
    };
    adCampaigns.add(campaignId, updatedCampaign);
    campaign.bidPerClick;
  };

  public shared ({ caller }) func recordAdConversion(campaignId : AdCampaignId, orderValue : Float) : async () {
    // Public function - no auth check needed (tracking conversions from any visitor)
    let campaign = switch (adCampaigns.get(campaignId)) {
      case (null) { Runtime.trap("Campaign not found") };
      case (?c) { c };
    };

    let updatedCampaign = {
      campaign with
      totalOrders = campaign.totalOrders + 1;
      totalRevenue = campaign.totalRevenue + orderValue;
    };
    adCampaigns.add(campaignId, updatedCampaign);
  };

  public query ({ caller }) func getAdCampaignsByMaker(makerId : MakerId) : async [AdCampaign] {
    // Verify caller owns the maker or is admin
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      // For non-admins, we need to verify they own this maker
      // Since there's no maker-to-principal mapping in the current system,
      // we'll restrict this to admin-only for security
      Runtime.trap("Unauthorized: Only admins can view ad campaigns by maker");
    };

    let allCampaigns = adCampaigns.values().toArray();
    allCampaigns.filter(func(c) { c.makerId == makerId });
  };

  public query ({ caller }) func getAllAdCampaigns() : async [AdCampaign] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all campaigns");
    };
    adCampaigns.values().toArray();
  };

  public query func getRankedAds(state : Text, category : Text) : async [RankedAd] {
    // Public query - no auth check needed (anyone can view ranked ads)
    let campaigns = adCampaigns.values().toArray();
    let activeCampaigns = campaigns.filter(func(c) { c.status == "active" });

    func calculateAdRankScore(c : AdCampaign) : Float {
      // Calculate relevance score based on target state+category matches
      var relevanceScore = 1.0;
      if (c.targetState != state and c.targetCategory == category) { relevanceScore := 0.7 };
      if (c.targetState == state and c.targetCategory != category) { relevanceScore := 0.7 };
      if (c.targetState != state and c.targetCategory != category) { relevanceScore := 0.4 };
      c.bidPerClick * c.qualityScore * relevanceScore;
    };

    let rankedAds = activeCampaigns.map(
      func(c) {
        {
          campaignId = c.id;
          productId = 1;
          makerId = c.makerId;
          adRankScore = calculateAdRankScore(c);
          adType = c.adType;
        };
      }
    );
    rankedAds.sort(
      func(a, b) {
        Float.compare(b.adRankScore, a.adRankScore);
      }
    );
  };

  public query ({ caller }) func getAdAnalytics(campaignId : AdCampaignId) : async AdAnalytics {
    // Verify caller owns the campaign or is admin
    let campaign = switch (adCampaigns.get(campaignId)) {
      case (null) { Runtime.trap("Campaign not found") };
      case (?c) { c };
    };

    if (not AccessControl.isAdmin(accessControlState, caller)) {
      // For non-admins, we need to verify they own this campaign
      // Since there's no maker-to-principal mapping in the current system,
      // we'll restrict this to admin-only for security
      Runtime.trap("Unauthorized: Only admins can view ad analytics");
    };

    let cpo = if (campaign.totalOrders > 0) {
      campaign.totalSpend / campaign.totalOrders.toFloat();
    } else { 0.0 };

    let roas = if (campaign.totalSpend > 0.0) {
      campaign.totalRevenue / campaign.totalSpend;
    } else { 0.0 };

    {
      campaignId;
      impressions = campaign.totalImpressions;
      clicks = campaign.totalClicks;
      orders = campaign.totalOrders;
      totalSpend = campaign.totalSpend;
      totalRevenue = campaign.totalRevenue;
      cpo;
      roas;
    };
  };

  public query ({ caller }) func getPlatformAdRevenue() : async Float {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view platform ad revenue");
    };

    let campaigns = adCampaigns.values().toArray();
    let totalRevenue = campaigns.foldLeft(
      0.0,
      func(sum, c) { sum + c.totalSpend },
    );
    totalRevenue;
  };
};
