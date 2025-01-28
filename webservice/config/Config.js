//Config.js
class Config {  // Config class to manage the environment variables for the application
    constructor() {  // constructor to initialize the environment variables for the application
        this.servermode = process.env.SERVER_MODE || 'dev'; // 'dev', 'uat', 'prod'
        this.DBType = process.env.DB_TYPE || 'MONGODB';
        this.DBName = process.env.DB_NAME || 'CRUD220125'; // Updated database name
        this.DBUser = process.env.DB_USER || '';
        this.DBHost = process.env.DB_HOST || '127.0.0.1';
        this.DBPass = process.env.DB_PASS || '';
        this.DBPort = process.env.DB_PORT || '27017';

		this.errmsg = {
			checkcontact: "OTP has been sent to your registered contact no.",
			invalidcontact: "Please enter valid contact no.",
			notsuperadmin: "You are not authorized to add a new Super Admin.",
			insert: "inserted successfully.",
			update: "updated successfully.",
			delete: "deleted successfully.",
			password : 'Password is too weak',
			bulkwrite: "Bulk write successfully done.",
			required: "Please fill in all required fields.",
			inuse: "Data is already in use.",
			isexist: "Data already exist.",
			isexist:"Email and Username Already Used Please another one",
			futurelog: "Future log not apply",
			addleave: "Please add leave first",
			notexist: "Data not exist.",
			dberror: "Something went wrong, Error Code : ",
			userright: "Sorry, You don't have enough permissions to perform this action",
			size: "Sorry, You don't have enough permissions to perform this action",
			success: "Data found",
			error: "Error",
			nodatafound: "No data found",
			uservalidate: "User Validate.",
			checkmail: "Check Mail",
			deactivate: "Your account is suspended, please contact administrator to activate account.",
			invalidrequest: "Invalid request.",
			sessiontimeout: "Session timeout",
			samedisplayorder: "Same display order data is already exist.",
			samedisplayorderlayoutexist: "Same display order property layout is already exist.",
			samedisplayorderamenitiesexist: "Same display order amenities is already exist.",
			sametitlepromotionexist: "Same title promotion is already exist.",
			sametitlepropetylayoutexist: "Same title property layout is already exist.",
			samenameamenitiesexist: "Same name amenities is already exist.",
			cannotaddfoldertosamefolder: "Sorry, you can't add this folder to the same folder",
			dataduplicate: "Data Duplicated Succesfully",
			cannotdeleteauperadmin: "Can not delete admin",
			tokenvalidate: "Token validated",
			invalidtoken: "Invalid token.",
			usernotfound: "User not found",
			correctpass: "Please enter correct old password",
			invalidusername: "Invalid Username or Password.",
			invalidpassword: "Invalid Username or Password.",
			verifyemail: "Please verify your email addess",
			clockintoproperty: "Please switch the clockin property to ",
			verifysubdomain: "Please verify subdomain",
			filetype: "Invalid file extension",
			loginright: "Sorry, You don't have enough permissions to login. Please contact admin",
			somethingwrong: "Sorry, something went wrong.",
			loginsuccess: "Login Successfully",
			logoutsuccess: "Logout Successfully",
			appupdate: "We have released new version of glam App. Download the update and install to continue use this App.",
			"profile-update": "Profile updated successfully",
			reqseries: "Series data is required",
			seriesnotfound: "Series not found.",
			reqflow: "Flow is required",
			nonotifound: "No notification found",
			noorderfound: "No order found",
			nologfound: "No log found",
			nolostfoundrecord: "Lost and Found record is not found",
			itemready: "Item has been ready successfully",
			itemserved: "Item has been served successfully",
			processavailibility: "Procedure Flow not available",
			personnotfound: "Person not found",
			personisrequired: "Person is required",
			notificationnotsent: "Notification not sent",
			notificationsentsuccessfully: "Notification sent successfully",
			uncompletedtasknotfound: "Uncompleted task not found",
			remindernotfound: "Reminder not found",
			mediauploaded: "Media uploaded",
			nofileuploaded: "No file uploaded",
			mediadeleted: "Media Deleted",
			serialnumberalreadyinuse: "Serial number already in used.",
			taskexist: "task already exist.",
			youcannotupdatesubcategory: "You can't update service.",
			auditrundatenotbegreaterthantody: "The audit date should not be greater than today.",
			webloginright: "Sorry, You are not allowed to web login. Please contact admin",
			apploginright: "Sorry, You are not allowed to app login. Please contact admin",
			preferencesavedsuccessfully: "Preference saved successfully.",
			removeallsubgroups: "Please remove all sub groups first then convert main group to sub group",
			onlyadminsallowedtomsg: "Sorry, Only Admin can send messages.",
			groupisdeleted: "Sorry, group is deleted by admin.",
			removedfromgroup: "Sorry, you were removed from this group by Admin.",
			cleanorsubcategorytaskexist: "Cleaning or subcategory task should be already exist.",
			cantaddcheckinorcheckoutsubcategory: "Can't add checkin or checkout sub category.",
			subcategoryisalreadyaddedintheanothertask: "subcategory is already added in the another task.",
			cantaddtask: "Can't add task because,",
			profiledatanotfound: "Profile data not found",
			alreadyonvideocall: "Sorry, user is on another call.",
			companynotfound: "Company not found",
			clockoutfromoldproperty: "First, Clockout From Current Property",
			breakoutfromoldproperty: "First, Breakout From Current Property",
			alreadyaccepted: "Task already accepted!",
			alreadystarted: "Task already started!",
			breaktimerunning: "Can't start timer on breaktime or traveltime",
			needclockinfirst: "First you need to clock-in a property",
			groupnotfound: "Group not found.",
			onlysendercanupdate: "You cannot edit sender message.",
			alreadyvotedpoll: "You cannot vote on this poll again.",
			pollnotfound: "Poll not found",
			notdeleted: "Data not deleted",
			copysuccess: "Data copied successfully",
			overwritesuccess: "Data overwrite successfully",
			typemessageagain: "Sorry, please type your query or message again",
			cancelreservation: "Current reservation cannot be cancelled in extend stay",
			invalidip: "This IP address is not allowed",
			chooseanotherlatecheckouttime: "Sorry, we are unable to approve the time you have entered. Please select another time. ",
			nolatecheckoutorroomtypeprovided: "No latecheckouttime or roomtype if provided.",
			clockin: "You have successfully clocked in",
			clockout: "You have successfully clocked out",
			policyassigned: "Below employees already has a policy assigned for current year",
			policyused: "Below employees already used policy",
			shiftexist: "Below employees already has a Shift assigned for this month range",
			attendancepinexist: "Attendance pin is already in use",
			selfloan: "can not approve self loan",
			superadminlessthanone: "All super admin delete are not allowed",
			moduletypenotfound: "Moduletype not found",
			iconnotfound: "Icon not found",
			salaryapproved: "Can not re-run approved salary",
			noofnight: "No Of Night Required",
			auditrunstart: "Audit run started successfully",
			auditrunprocess: "Audit run already in progress.",
			passwordexpired: "Your password has been expired, please change your password.",
			otpsent: "OTP has been sent to your registered email address.",
			otpsended: "OTP already has been sent to your email. Please check your email.",
			otpverify: "OTP verified successfully.",
			otpexpired: "OTP has expired. Please request a new one.",
			invalidotp: "Invalid OTP. Please try again.",
			otpnotsent: "OTP not sent. Please verify your email address.",
			otpnotverified: "OTP not verified. Please verify your email address.",
			passreset: "Password Reset Successfully",
			emailsent: "Email Sent",
			processstart: "Process started, please wait.",
			bulksalarygenerate: "Salary generated",
			lastpasswordsame: "New password can not be same as old password",
			last4passwordsame: "New password can not be same as last 4 password",
			passchanged: "Password changed successfully",
			usernotauthorised: "You are not authorised",
			propertynotallowed: "You are not allowed to access this property",
			apinotfound: "API Route Not Found",
			breakinpersonlimit: "Break limit of this callcenter is exceed",
			calltranferlimit: "Call Transfer Limit Exceed",
			breaklimit: "Break limit of this callcenter is exceed, you can not transfer call and your break added in queue",
			breakqueueadd: "Break Queue Added Successfully",
			existbreakqueue: "You are already in break queue, please wait for your turn",
			surveyformexpired: "Survey form has been expired",
			userdomainexist: "User domain already exist",
			pmsconnectnotfound: "glam PMS connect not found",
			preferenceupdated: "Preference Updated Successfully",
			linkexpired: "Your Link Has Been Expired",
			sessionunlock: "Session Unlocked Successfully",
			invalidsessionpassword: "Invalid Password",
			invalidsession2facode: "Invalid 2FA Code",
			menualreadyassign: 'Menu already assign please update the menu assign data',
			timeslotoverlap: "The provided timeslots are overlapping. Please provide non-conflicting timeslots.",
			alreadybooked: "Sorry, the facility is already booked for the selected time slot. Please choose a different time.",
			notclockin: "You haven't clocked in yet",
			//panish 
			alreadyin: "The visitor is already present this property.",
			visitorout: "The visitor has checked out.",
			visitorin: "The visitor has checked in.",
			visitorexpired: "The visitor's code is not valid at this time.",
			noteditable: "Facility booking cannot be edited once approved or rejected.",
			notreopen: "This Ticket not Reopen yet.",
			qrcodenotfound: "QR code not found. Ensure the code is correct and try again.",
			qrcodesuccess: "QR code scanned successfully. Access granted.",
			notchecklist: "Task cannot be completed. Required checklists missing",
			selfapprove: "Can't approve self request",
            selfreject: "Can't reject self request",
			terminated:"Your account has been terminated. Please contact your administrator for more details.",
			selfterminated: "You cannot terminated your own account.",
			selfdeactive: "You cannot deactive your own account.",
			vendoralreadybook:"this vendor is already assign to your unit.",
			dailyhelpalreadybook:"this daily helper is already assign to your unit.",
			"2FAalreadyenable": "You have already turned on the two factor authentication",
			"2FAnotenabled": "Two factor authentication is not enabled",
			"2FAnotreuqest": "You have not requested to turn on the two factor authentication",
			"2FAinvalidotp": "OTP Validation failed - You have entered incorrect otp",
			"2FAenable": "Two factor authentication enabled successfully",
			"2FAdisable": "Two factor authentication disabled successfully",
			"2FAnotsent": "You have not sent request for 2 factor authentication",
			"2FAinvalidrecoverycode": "Invalid Recovery Code Provided",
		}

        this.resstatuscode = {
			100: "Continue",
			101: "Switching Protocols",
			103: "Early Hints",
			200: "OK",
			201: "Created",
			202: "Accepted",
			203: "Non-Authoritative Information",
			204: "No Content",
			205: "Reset Content",
			206: "Partial Content",
			300: "Multiple Choices",
			301: "Moved Permanently",
			302: "Found",
			303: "See Other",
			304: "Not Modified",
			307: "Temporary Redirect",
			308: "Permanent Redirect",
			400: "Bad Request",
			401: "Unauthorized",
			402: "Payment Required",
			403: "Forbidden",
			404: "Not Found",
			405: "Method Not Allowed",
			406: "Not Acceptable",
			407: "Proxy Authentication Required",
			408: "Request Timeout",
			409: "Conflict",
			410: "Gone",
			411: "Length Required",
			412: "Precondition Failed",
			413: "Payload Too Large",
			414: "URI Too Long",
			415: "Unsupported Media Type",
			416: "Range Not Satisfiable",
			417: "Expectation Failed",
			418: "I'm a teapot", // Joke status code defined in RFC 2324
			422: "Unprocessable Entity",
			425: "Too Early",
			426: "Upgrade Required",
			428: "Precondition Required",
			429: "Too Many Requests",
			431: "Request Header Fields Too Large",
			451: "Unavailable For Legal Reasons",
			500: "Internal Server Error",
			501: "Not Implemented",
			502: "Bad Gateway",
			503: "Service Unavailable",
			504: "Gateway Timeout",
			505: "HTTP Version Not Supported",
			506: "Variant Also Negotiates",
			507: "Insufficient Storage",
			508: "Loop Detected",
			510: "Not Extended",
			511: "Network Authentication Required"
		}

		this.tokenkey = process.env.JWT_SECRET
    }

	getResponsestatuscode() { // getResponsestatuscode function to return the response status code object from the environment variables
		return this.resstatuscode;
	}
     
	getTokenKey() {
		return this.tokenkey
	}

    getErrmsg() {
		return this.errmsg;
	}

    getServerMode() { // getServerMode function to return the server mode
        return this.servermode;
    }

    getDBType() {
        return this.DBType;
    }

    getDBName() {
        return this.DBName;
    }

    getDBUser() {
        return this.DBUser;
    }

    getDBHost() {
        return this.DBHost;
    }

    getDBPass() {
        return this.DBPass;
    }

    getDBPort() {
        return this.DBPort;
    }

    getErrmsg() {
        return { // Error messages for invalid environment variables
            serverMode: "Server mode must be one of 'dev', 'uat', or 'prod'", // Updated error message for server mode if invalid
            dbConfig: "Database configuration is invalid", // Updated error message for database configuration if invalid
        };
    }
}


module.exports = Config; // Export the Config class for use in other modules

    // constructor() {
    //     this.servermode = process.env.SERVER_MODE || 'dev'; // 'dev', 'uat', 'prod'
    //     this.DBType = process.env.DB_TYPE || 'MONGODB';
    //     this.DBName = process.env.DB_NAME || 'myDatabase';
    //     this.DBUser = process.env.DB_USER || '';
    //     this.DBHost = process.env.DB_HOST || '127.0.0.1';
    //     this.DBPass = process.env.DB_PASS || '';
    //     this.DBPort = process.env.DB_PORT || '27017';
    // }