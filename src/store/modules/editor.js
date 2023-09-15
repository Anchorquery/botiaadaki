export default {
	state: {
		message: null,
		fileName: "Nuevo documento",
		foldersCreate : false,
		breadcrumbs: localStorage.getItem("breadcrumbs") ? JSON.parse(localStorage.getItem("breadcrumbs")) : [
			{
				name: "Home",
				path: "/",
			}
		],
		currentFolder : {
			name: "Home",
			_id: null,
		},
		addTextDocument: "",
		stateHistoryChat: false,
		currentChat: false  || localStorage.getItem("currentChat"),
		loadChat: false,
	},
	mutations: {
		setSharedData(state, data) {
				state.message = data;
		},
		setFileName(state, data) {
				state.fileName = data;
				localStorage.setItem("fileName", data);
		},
		setFolderCreated(state, data) {
			console.log(data);
				state.foldersCreate = data;
		},
		setFolderTitle(state, data) {
				state.currentFolder = data;
		},
		setBreadcrumbs(state, data) {
				state.breadcrumbs = data;
			localStorage.setItem("breadcrumbs", JSON.stringify(data));
		},
		setAddTextDocument(state, data) {
				state.addTextDocument = data;
		},
		setStateHistoryChat (state, data) {
			console.log(data);
			state.stateHistoryChat = data;
		},
		setCurrentChat (state, data) {
		
			state.currentChat = data;
		},
		setLoadChats	(state, data) {
			
			state.loadChat = data;
		}
	},
	getters: {
			getMessage: state => state.message,
			getFileName: state => state.fileName,
			getFolderCreate: state => state.foldersCreate,
			getCurrentFolder: state => state.currentFolder,
			getBreadcrumbs: state => state.breadcrumbs,
			getAddTextDocument: state => state.addTextDocument,
			getStateHistoryChat: state => state.stateHistoryChat,
			getCurrentChat: state => state.currentChat,
			getLoadChats: state => state.loadChat,

	},
	actions: {}
};
