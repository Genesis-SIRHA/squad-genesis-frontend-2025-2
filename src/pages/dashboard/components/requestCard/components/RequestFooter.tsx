import {SendHorizonal} from "lucide-react";

const RequestFooter = ({ editable }: { editable: boolean }) => (
    <footer className="flex flex-row justify-end bg-white border-t rounded-b-2xl border-gray-200 py-3 px-8">
        <button
            disabled={!editable}
            className={`flex flex-row rounded-xl p-2 gap-2 transform transition-transform ${
                editable ? 'bg-customGradient text-primary-smoke hover:opacity-80' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}>
            <p>Enviar</p>
            <SendHorizonal className="size-5" />
        </button>
    </footer>
);

export default RequestFooter;