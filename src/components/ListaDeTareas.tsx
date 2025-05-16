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
}

const ListaDeTareas: React.FC<ListaDeTareasProps> = ({ tareas }) => {
    return (
        <div>
            {tareas.map((tarea) => (
                <Tarea key={tarea.id} {...tarea} />
            ))}
        </div>
    );
};

export default ListaDeTareas;
