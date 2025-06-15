import React, { useRef, useState, useEffect } from 'react';
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonCol,
  IonGrid,
  IonRow
} from '@ionic/react';
import ListaDeTareas from '../components/ListaDeTareas';

const Home: React.FC = () => {
  const tareaRef = useRef<HTMLIonInputElement>(null);
  const tareaDes = useRef<HTMLIonInputElement>(null);
  let fechaActual: Date = new Date();
  let valorPrioridad: string = "Media";
  let [numeroTarea, setnumeroTarea] = useState(0);

  const [tareas, setTareas] = useState([
    {
      id: 1,
      nombre: 'Estudiar React',
      descripcion: 'Revisar hooks y contexto',
      fechaLimite: fechaActual.getDate() +
        "/" +
        (fechaActual.getMonth() + 1) +
        "/" +
        +fechaActual.getFullYear() +
        " " +
        +fechaActual.getHours() +
        ":" +
        +fechaActual.getMinutes(),
      prioridad: 'Media'
    },
  ]);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const tareasParseadas = JSON.parse(savedTasks);
      setTareas(tareasParseadas);
      if (tareasParseadas.length > 0) {
        setnumeroTarea(tareasParseadas[tareasParseadas.length - 1].id + 1);
      }
    }
  }, []);

  const agregarTarea = () => {
    const tituloTarea = tareaRef.current?.value as string;
    const DesTarea = tareaDes.current?.value as string;
    if (tituloTarea) {
      const nuevaTarea = {
        id: numeroTarea,
        nombre: tituloTarea,
        descripcion: DesTarea,
        fechaLimite: fechaActual.getDate() +
          "/" +
          (fechaActual.getMonth() + 1) +
          "/" +
          +fechaActual.getFullYear() +
          " " +
          +fechaActual.getHours() +
          ":" +
          +fechaActual.getMinutes(),
        prioridad: valorPrioridad,
      };
      localStorage.setItem('tasks', JSON.stringify([...tareas, nuevaTarea]))
      setTareas([...tareas, nuevaTarea]);
      setnumeroTarea(numeroTarea + 1)
      tareaRef.current!.value = ""; // Limpiar el input después de agregar
      tareaDes.current!.value = ""; // Limpiar el input después de agregar
    }
  };

  const eliminarTarea = (id: number) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    localStorage.setItem('tasks', JSON.stringify(nuevasTareas))
    setTareas(nuevasTareas);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Lista de Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="ion-text-center">

          <IonList>
            <IonItem lines="none">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        ref={tareaRef}
                        placeholder="Titulo de la nueva tarea"
                        style={{ maxWidth: '300px', margin: '0 auto' }}
                      />
                    </IonCol>
                    <IonCol size='2'>
                      <IonSelect
                        placeholder="Prioridad"
                        interface="popover" // Opcional: se ve más lindo en centro
                        style={{ maxWidth: '99px', margin: '0 auto' }}
                        onIonChange={(event) => valorPrioridad = event.detail.value}
                      >
                        <IonSelectOption value="Alta">Alta</IonSelectOption>
                        <IonSelectOption value="Media">Media</IonSelectOption>
                        <IonSelectOption value="Baja">Baja</IonSelectOption>
                      </IonSelect>
                    </IonCol>
                  </IonRow>
                  <IonInput
                    ref={tareaDes}
                    placeholder="Descripcion de la nueva tarea"
                    style={{ maxWidth: '300px', margin: '0 auto' }}
                  />
                </IonGrid>

              </div>
            </IonItem>
          </IonList>
          <IonButton
            expand="block"
            onClick={agregarTarea}
            style={{ marginTop: '16px', maxWidth: '350px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Agregar Nueva Tarea
          </IonButton>
        </div>

        <ListaDeTareas tareas={tareas} onEliminar={eliminarTarea} />
        {/* <TareasCompletadas tareas={tareas} onEliminar={eliminarTarea} />  
        Aca hay que crear nuevo componente para tareas terminadas
        */}
      </IonContent>

    </IonPage>
  );
};

export default Home;
