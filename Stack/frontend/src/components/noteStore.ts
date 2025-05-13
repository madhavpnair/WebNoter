import {create} from 'zustand'

type NoteState = {
    note : string;
    setNote : (newNote: string) => void; 
}

const useNoteStore = create<NoteState>((set)=>({
    note: "",
    setNote: (newNote) => set({note : newNote})
}));

export default useNoteStore;