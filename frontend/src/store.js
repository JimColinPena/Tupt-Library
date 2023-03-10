import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


import { 
	allBooksReducer,
	newBookReducer,
	bookDetailsReducer,
	bookReducer,
	addBookAccessionReducer,
	bookAccessionReducer,
	accessionDetailsReducer,
	accessionReducer,
	bookReportsReducer,
	bookAccreditationReducer
} from './reducers/bookReducers'

import { 
	allResearchesReducer,
	newResearchReducer,
	researchDetailsReducer,
	researchReducer,
} from './reducers/researchReducers'

import { 
	allPersonnelsReducer,
	newPersonnelReducer,
	personnelDetailsReducer,
	personnelReducer,
	allActiveStudentsReducer,
	allInactiveStudentsReducer,
	studentDetailsReducer,
	studentReducer,
	allBorrowersReducer,
	allBorrowedBooksReducer,
	acceptBorrowReducer,
	declineBorrowReducer,
	returnBookReducer,
	declineBookReducer,
	borrowedBookAccessionReducer,
	allReturnedBooksReducer,
	userDetailReducer,
	allHistoryLogReducer,
	historylogReducer,
	changeDueDateReducer,
	penaltyCheckReducer,
	penaltiesAllReducer,
	paidPenaltiesReducer
} from './reducers/personnelReducers'

import { 
	singleStudentDetailsReducer,
	changeStudentDetailsReducer,
	allStudentBooksReducer,
	studentBookDetailsReducer,
	allStudentBorrowBookReducer,
	allStudentAppointmentBookReducer,
	penaltySlipReducer,
} from './reducers/studentReducers'

import { 
	borrowBookReducer,
	checkBorrowBookReducer,
	cancelBorrowBookReducer,
	confirmBorrowBookReducer,
	cancelAllBorrowBookReducer,
	borrowedBooksLengthReducer,
	pendingBookRequestsReducer,
	pendingUserRequestsReducer,
	borrowedBooksChartReducer,
	sectionBorrowedChartReducer,
	bookLeaderboardsReducer,
	borrowerLeaderboardsReducer
} from './reducers/borrowReducers'

import { 
	authReducer,
	profileReducer,
	allUsersReducer,
	updateUserRoleReducer,
	activateUserReducer,
	deactivatedUserReducer,
	endtermReducer,
	allNotificationReducer,
	notificationDeleteReducer,
	notificationAllDeleteReducer,
	counterNotificationReducer,
	seenNotificationReducer
} from './reducers/userReducers'

import {
	checkEvaluationsReducer,
	allEvaluationsReducer,
	newEvaluationReducer,
	evaluationReducer,
	studentEvaluationReducer,
} from './reducers/evaluationReducers'

const reducer = combineReducers({
	auth: authReducer,
	profile:profileReducer,
	allBooks: allBooksReducer,
	bookDetails: bookDetailsReducer,
	newBook: newBookReducer,
	book: bookReducer,
	addBookAccession: addBookAccessionReducer,
	bookAccession: bookAccessionReducer,
	accessionReducer: accessionReducer,
	accessionDetails: accessionDetailsReducer,
	allResearches: allResearchesReducer,
	researchDetails: researchDetailsReducer,
	newResearch: newResearchReducer,
	research: researchReducer,
	allPersonnels: allPersonnelsReducer,
	personnelDetails: personnelDetailsReducer,
	newPersonnel: newPersonnelReducer,
	personnel: personnelReducer,
	singleStudentDetails: singleStudentDetailsReducer,
	changeStudentDetails: changeStudentDetailsReducer,
	allStudentBooks: allStudentBooksReducer,
	studentBookDetails: studentBookDetailsReducer,
	allStudentBorrowBook: allStudentBorrowBookReducer,
	allStudentAppointmentBook: allStudentAppointmentBookReducer,
	penaltySlip: penaltySlipReducer,
	borrowBook: borrowBookReducer,
	checkBorrowBook: checkBorrowBookReducer,
	cancelBorrowBook: cancelBorrowBookReducer,
	confirmBorrowBook: confirmBorrowBookReducer,
	cancelAllBorrowBook: cancelAllBorrowBookReducer,
	borrowedBooksLength: borrowedBooksLengthReducer,
	pendingBookRequests: pendingBookRequestsReducer,
	pendingUserRequests: pendingUserRequestsReducer,
	borrowedBooksCharts: borrowedBooksChartReducer,
	sectionBorrowedCharts: sectionBorrowedChartReducer,
	bookLeaderboards: bookLeaderboardsReducer,
	borrowerLeaderboards: borrowerLeaderboardsReducer,
	allActiveStudents: allActiveStudentsReducer,
	allInactiveStudents: allInactiveStudentsReducer,
	studentDetails: studentDetailsReducer,
	student: studentReducer,
	allBorrow: allBorrowersReducer,
	allBorrowed: allBorrowedBooksReducer,
	declineBorrower: declineBorrowReducer,
	acceptBorrower: acceptBorrowReducer,
	returnBook: returnBookReducer,
	declineBook: declineBookReducer,
	borrowedBookAccession: borrowedBookAccessionReducer,
	allReturnedState: allReturnedBooksReducer,
	userDetail: userDetailReducer,
	historyLogs: allHistoryLogReducer,
	historylog: historylogReducer,
	changeDueDate: changeDueDateReducer,
	penaltyCheck: penaltyCheckReducer,
	checkEvaluations: checkEvaluationsReducer,
	allevaluation: allEvaluationsReducer,
	newevaluation: newEvaluationReducer,
	evaluationReducer: evaluationReducer,
	studentEvaluation: studentEvaluationReducer,
	allUsers: allUsersReducer,
	updateUserRole: updateUserRoleReducer,
	activateUser: activateUserReducer,
	deactivateUser: deactivatedUserReducer,
	endtermuser: endtermReducer,
	penaltiesall: penaltiesAllReducer,
	paidPenalties: paidPenaltiesReducer,
	notifications: allNotificationReducer,
	singleDeleteNotification: notificationDeleteReducer,
	allDeleteNotification: notificationAllDeleteReducer,
	counterNotification: counterNotificationReducer,
	seenNotification: seenNotificationReducer,
	getbookReports: bookReportsReducer,
	bookAccreditationReports: bookAccreditationReducer
})


let initialState = {

}

const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;