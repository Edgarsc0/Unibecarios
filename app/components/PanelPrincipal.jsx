"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Eye, Users, Calendar, MapPin, FileText, Edit } from "lucide-react"
import { addVacante } from "@/serverActions/addVacante"
import toast from "react-hot-toast"
import useSession from "@/hooks/useSession"
import LoadingOverlay from "./Loading"
import { updateVacanteState } from "@/serverActions/updateVacanteState"
import { updateVacante } from "@/serverActions/updateVacante"
import ShowPostulantes from "./ShowPostulantes"

export default function PanelPrincipal({ listaVacantes, postulantes }) {

    const [vacantes, setVacantes] = useState(
        listaVacantes.map(v => ({
            ...v,
            requisitos: typeof v.requisitos === "string" ? JSON.parse(v.requisitos) : v.requisitos
        }))
    );

    const [modalAbierto, setModalAbierto] = useState(false)
    const [nuevaVacante, setNuevaVacante] = useState({
        titulo: "",
        domicilio: "",
        descripcion: "",
        fechaCierre: "",
    })
    const [editInfoVacante, setEditInfoVacante] = useState({
        titulo: "",
        domicilio: "",
        descripcion: "",
        fecha_cierre: "",
    })
    const [requisitos, setRequisitos] = useState([])
    const [nuevoRequisito, setNuevoRequisito] = useState("")
    const [editVacante, setEditVacante] = useState(false);
    const [currentVacanteEdit, setCurrentVacanteEdit] = useState(null);
    const [currentPostulantes, setCurrentPostulantes] = useState(null);

    const { session, loading } = useSession();

    useEffect(() => {
        console.log(currentPostulantes);
    }, [currentPostulantes]);

    if (loading) return <LoadingOverlay isActive={true} message='Cargando sesión...' />

    const agregarRequisito = () => {
        if (nuevoRequisito.trim()) {
            const requisito = {
                id: Date.now().toString(),
                texto: nuevoRequisito.trim(),
            }
            setRequisitos([...requisitos, requisito])
            setNuevoRequisito("")
        }
    }

    const eliminarRequisito = (id) => {
        setRequisitos(requisitos.filter((req) => req.id !== id))
    }

    const crearVacante = async () => {
        if (nuevaVacante.titulo && nuevaVacante.domicilio && nuevaVacante.descripcion && nuevaVacante.fechaCierre) {
            const vacante = {
                id: Date.now().toString(),
                ...nuevaVacante,
                requisitos: [...requisitos],
                estado: "Activa",
            }

            const response = await addVacante(vacante, session.enterpriseId);

            if (response.ok) {
                toast.success(response.message);
                setVacantes([...vacantes, vacante])
                setNuevaVacante({ titulo: "", domicilio: "", descripcion: "", fechaCierre: "" })
                setRequisitos([])
                setModalAbierto(false)
                window.location.reload()
            } else {
                toast.error(response.message);
            }
        }
    }

    const cambiarEstadoVacante = async (id, nuevoEstado) => {
        const response = await updateVacanteState(id, nuevoEstado);
        if (response.ok) {
            toast.success(response.message);
            setVacantes(vacantes.map((vacante) => (vacante.id === id ? { ...vacante, estado: nuevoEstado } : vacante)))
        } else {
            toast.error(response.message);
        }
    }

    const handleEditVacante = (vacante) => {
        setCurrentVacanteEdit(vacante);
        setEditInfoVacante({
            titulo: vacante.titulo,
            domicilio: vacante.domicilio,
            descripcion: vacante.descripcion,
            fecha_cierre: new Date(vacante.fecha_cierre).toISOString().split("T")[0],
        });
        setRequisitos([...vacante.requisitos]); // ← Añadido
        setEditVacante(true);
    }

    const handleCloseEditModal = () => {
        setEditVacante(false);
        setCurrentVacanteEdit(null);
    }

    const actualizarVacante = async () => {
        if (!currentVacanteEdit) return;

        const vacanteActualizada = {
            ...currentVacanteEdit,
            ...editInfoVacante,
            fecha_cierre: editInfoVacante.fecha_cierre,
            requisitos: requisitos.length > 0 ? JSON.stringify(requisitos) : JSON.stringify(currentVacanteEdit.requisitos),
        };
        const response = await updateVacante(vacanteActualizada);
        if (response.ok) {
            toast.success(response.message);
            window.location.reload();
        } else {
            toast.error(response.message);
        }
    }

    const handleShowPostulantes = (postulantes) => {
        setCurrentPostulantes(postulantes);
    }

    return (
        <>
            <Dialog open={editVacante} onOpenChange={() => handleCloseEditModal()}>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Editar vacante {currentVacanteEdit ? (currentVacanteEdit.titulo) : "Cargando..."}</DialogTitle>
                        <DialogDescription>Actualiza los campos que deseas modificar de la vacante</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="titulo">Título de la Vacante</Label>
                            <Input
                                id="titulo"
                                placeholder="Ej: Desarrollador Frontend React"
                                value={editInfoVacante.titulo}
                                onChange={(e) => setEditInfoVacante({ ...editInfoVacante, titulo: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="domicilio">Domicilio/Ubicación</Label>
                            <Input
                                id="domicilio"
                                placeholder="Ej: Ciudad de México, CDMX"
                                value={editInfoVacante.domicilio}
                                onChange={(e) => setEditInfoVacante({ ...editInfoVacante, domicilio: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="descripcion">Descripción del Puesto</Label>
                            <Textarea
                                id="descripcion"
                                placeholder="Describe las responsabilidades y características del puesto..."
                                className="min-h-[100px]"
                                value={editInfoVacante.descripcion}

                                onChange={(e) => setEditInfoVacante({ ...editInfoVacante, descripcion: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fechaCierre">Fecha de Cierre</Label>
                            <Input
                                id="fechaCierre"
                                type="date"
                                value={editInfoVacante.fecha_cierre}
                                onChange={(e) =>
                                    setEditInfoVacante({ ...editInfoVacante, fecha_cierre: e.target.value })
                                }
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Requisitos del Puesto</Label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Agregar nuevo requisito..."
                                    value={nuevoRequisito}
                                    onChange={(e) => setNuevoRequisito(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && agregarRequisito()}
                                />
                                <Button type="button" onClick={agregarRequisito}>
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            {requisitos.length > 0 && (
                                <div className="border rounded-md">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Requisito</TableHead>
                                                <TableHead className="w-[100px]">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {requisitos.map((requisito) => (
                                                <TableRow key={requisito.id}>
                                                    <TableCell>{requisito.texto}</TableCell>
                                                    <TableCell>
                                                        <Button variant="ghost" size="sm" onClick={() => eliminarRequisito(requisito.id)}>
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseEditModal}>
                            Cancelar
                        </Button>
                        <Button onClick={actualizarVacante}>Guardar Cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="container mx-auto p-6 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
                    <p className="text-gray-600">Gestiona las vacantes de trabajo de tu empresa</p>
                </div>

                <Tabs defaultValue="crear" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="crear" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Crear Nueva Vacante
                        </TabsTrigger>
                        <TabsTrigger value="administrar" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Administrar Vacantes
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="crear">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Plus className="w-5 h-5" />
                                    Crear Nueva Vacante
                                </CardTitle>
                                <CardDescription>Completa la información para publicar una nueva vacante de trabajo</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full sm:w-auto">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Abrir Formulario de Vacante
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Nueva Vacante de Trabajo</DialogTitle>
                                            <DialogDescription>Completa todos los campos para crear una nueva vacante</DialogDescription>
                                        </DialogHeader>

                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="titulo">Título de la Vacante</Label>
                                                <Input
                                                    id="titulo"
                                                    placeholder="Ej: Desarrollador Frontend React"
                                                    value={nuevaVacante.titulo}
                                                    onChange={(e) => setNuevaVacante({ ...nuevaVacante, titulo: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="domicilio">Domicilio/Ubicación</Label>
                                                <Input
                                                    id="domicilio"
                                                    placeholder="Ej: Ciudad de México, CDMX"
                                                    value={nuevaVacante.domicilio}
                                                    onChange={(e) => setNuevaVacante({ ...nuevaVacante, domicilio: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="descripcion">Descripción del Puesto</Label>
                                                <Textarea
                                                    id="descripcion"
                                                    placeholder="Describe las responsabilidades y características del puesto..."
                                                    className="min-h-[100px]"
                                                    value={nuevaVacante.descripcion}
                                                    onChange={(e) => setNuevaVacante({ ...nuevaVacante, descripcion: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="fechaCierre">Fecha de Cierre</Label>
                                                <Input
                                                    id="fechaCierre"
                                                    type="date"
                                                    value={nuevaVacante.fechaCierre}
                                                    onChange={(e) => setNuevaVacante({ ...nuevaVacante, fechaCierre: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label>Requisitos del Puesto</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Agregar nuevo requisito..."
                                                        value={nuevoRequisito}
                                                        onChange={(e) => setNuevoRequisito(e.target.value)}
                                                        onKeyPress={(e) => e.key === "Enter" && agregarRequisito()}
                                                    />
                                                    <Button type="button" onClick={agregarRequisito}>
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>

                                                {requisitos.length > 0 && (
                                                    <div className="border rounded-md">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Requisito</TableHead>
                                                                    <TableHead className="w-[100px]">Acciones</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {requisitos.map((requisito) => (
                                                                    <TableRow key={requisito.id}>
                                                                        <TableCell>{requisito.texto}</TableCell>
                                                                        <TableCell>
                                                                            <Button variant="ghost" size="sm" onClick={() => eliminarRequisito(requisito.id)}>
                                                                                <Trash2 className="w-4 h-4 text-red-500" />
                                                                            </Button>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setModalAbierto(false)}>
                                                Cancelar
                                            </Button>
                                            <Button onClick={crearVacante}>Crear Vacante</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="administrar">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Administrar Vacantes
                                </CardTitle>
                                <CardDescription>Gestiona el estado y visualiza los postulantes de tus vacantes</CardDescription>
                            </CardHeader>
                            <CardContent>


                                {vacantes.length === 0 ? (
                                    <div className="text-center py-8">
                                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay vacantes creadas</h3>
                                        <p className="text-gray-500">Crea tu primera vacante para comenzar a recibir postulaciones</p>
                                    </div>
                                ) : (
                                    <div className="rounded-md border">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Vacante</TableHead>
                                                    <TableHead>Ubicación</TableHead>
                                                    <TableHead>Estado</TableHead>
                                                    <TableHead>Postulantes</TableHead>
                                                    <TableHead>Fecha Cierre</TableHead>
                                                    <TableHead>Acciones</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {vacantes.map((vacante) => (
                                                    <TableRow key={vacante.id}>
                                                        <TableCell>
                                                            <div>
                                                                <div className="font-medium">{vacante.titulo}</div>
                                                                <div className="text-sm text-gray-500 truncate max-w-[200px]">{vacante.descripcion}</div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1 text-sm">
                                                                <MapPin className="w-3 h-3" />
                                                                {vacante.domicilio}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Select
                                                                value={vacante.estado}
                                                                onValueChange={(valor) => cambiarEstadoVacante(vacante.id, valor)}
                                                            >
                                                                <SelectTrigger className="w-[120px]">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Activa">Activa</SelectItem>
                                                                    <SelectItem value="Pausada">Pausada</SelectItem>
                                                                    <SelectItem value="Cerrada">Cerrada</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1">
                                                                <Users className="w-4 h-4" />
                                                                <span className="font-medium">
                                                                    {postulantes.find(item => item.vacante_id == vacante.id)?.postulantes.length || 0}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-1 text-sm">
                                                                <Calendar className="w-3 h-3" />
                                                                {new Date(vacante.fecha_cierre).toLocaleDateString("es-MX", { timeZone: "UTC" })}
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex gap-1">
                                                                <Button variant="ghost" size="sm" onClick={() => handleShowPostulantes(postulantes.find(item => item.vacante_id == vacante.id))}>
                                                                    <Users className="w-4 h-4" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm" onClick={() => handleEditVacante(vacante)}>
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                {currentPostulantes && (
                    <>
                        <Button className="w-full mt-5" onClick={() => setCurrentPostulantes(null)}>Cerrar panel de administración de postulantes</Button>
                        <ShowPostulantes postulantes={currentPostulantes} />
                    </>
                )}
            </div>
        </>
    )
}
