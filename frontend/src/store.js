import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


import { 
	allBooksReducer,
	newBookReducer,
	bookDetailsReducer,
	bookReducer,
	addBookAccessionReducer,
	accessionDetailsReducer,
	accessionDeleteReducer,
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
	allReturnedBooksReducer,
	userDetailReducer,
	allHistoryLogReducer,
	historylogReducer,
	changeDueDateReducer,
	historylogAllDeleteReducer
} from './reducers/personnelReducers'

import { 
	singleStudentDetailsReducer,
	changeStudentDetailsReducer,
	allStudentBooksReducer,
	studentBookDetailsReducer,
	allStudentBorrowBookReducer,
	allStudentAppointmentBookReducer,
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
	activateUserReducer,
	deactivatedUserReducer,
	endtermReducer
} from './reducers/userReducers'

import {
	allEvaluationsReducer,
	newEvaluationReducer,
} from './reducers/evaluationReducers'

const reducer = combineReducers({
	auth: authReducer,
	profile:profileReducer,
	allBooks: allBooksReducer,
	bookDetails: bookDetailsReducer,
	newBook: newBookReducer,
	book: bookReducer,
	addBookAccession: addBookAccessionReducer,
	accessionDelete: accessionDeleteReducer,
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
	allReturnedState: allReturnedBooksReducer,
	userDetail: userDetailReducer,
	historyLogs: allHistoryLogReducer,
	deletehistoryLogs: historylogReducer,
	changeDueDate: changeDueDateReducer,
	allevaluation: allEvaluationsReducer,
	newevaluation: newEvaluationReducer,
	allDeleteHistoryLog: historylogAllDeleteReducer,
	allUsers: allUsersReducer,
	activateUser: activateUserReducer,
	deactivateUser: deactivatedUserReducer,
	endtermuser: endtermReducer
})


let initialState = {

}

const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;