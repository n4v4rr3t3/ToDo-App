import React from 'react';
import Tarea from './Tarea';

interface ListaDeTareasProps {
    tareas: {
        id: number;
        nombre: string;
        descripcion?: string;
        fechaLimite?: string;
        prioridad: string;
    }[];
    onEliminar: (id: number) => void;
}

const ListaDeTareas: React.FC<ListaDeTareasProps> = ({ tareas, onEliminar }) => {
    return (
        <div>
            {tareas.map((tarea) => (
                <Tarea key={tarea.id} {...tarea} onEliminar={onEliminar} />
            ))}
        </div>
    );
};

export default ListaDeTareas;
