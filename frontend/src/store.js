import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'


import { 
	allBooksReducer,
	newBookReducer,
	bookDetailsReducer,
	bookReducer,
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
	changeDueDateReducer
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
} from './reducers/borrowReducers'

import { 
	authReducer,
	profileReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
	auth: authReducer,
	profile:profileReducer,
	allBooks: allBooksReducer,
	bookDetails: bookDetailsReducer,
	newBook: newBookReducer,
	book: bookReducer,
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
	changeDueDate: changeDueDateReducer
})


let initialState = {

}

const middlware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;