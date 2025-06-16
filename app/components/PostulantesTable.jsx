"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { CVModal } from "./CVModal"
import { changePostulanteEstado } from "@/serverActions/changePostulanteEstado"
import toast from "react-hot-toast"

export function PostulantesTable({ postulantes = [], vacanteId }) {
    const [selectedPostulante, setSelectedPostulante] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [estadosPostulantes, setEstadosPostulantes] = useState({})

    const handleVerCV = (postulante) => {
        setSelectedPostulante(postulante)
        setIsModalOpen(true)
    }

    const handleEstadoChange = async (postulanteId, nuevoEstado, { id_usuario }) => {

        const { ok, message } = await changePostulanteEstado(postulanteId, nuevoEstado, id_usuario);

        if (ok) {
            toast.success(message);
            setEstadosPostulantes((prev) => ({
                ...prev,
                [postulanteId]: nuevoEstado,
            }));
        } else {
            toast.success(message);
        }
    }

    const getEstadoBadgeColor = (estado) => {
        switch (estado) {
            case "Aceptar":
                return "bg-green-100 text-green-800 hover:bg-green-200"
            case "Descartar":
                return "bg-red-100 text-red-800 hover:bg-red-200"
            case "Pendiente por revisar":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Lista de Postulantes</CardTitle>
                    <p className="text-gray-600">Total de postulantes: {postulantes.length}</p>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Nombre</TableHead>
                                    <TableHead className="font-semibold">Carrera</TableHead>
                                    <TableHead className="font-semibold">Perfil en unibecarios</TableHead>
                                    <TableHead className="font-semibold">Estado</TableHead>
                                    <TableHead className="font-semibold text-center">CV</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {postulantes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No hay postulantes disponibles
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    postulantes.map((postulante) => {

                                        return (
                                            <TableRow key={postulante.cv_postulante} className="hover:bg-gray-50">
                                                <TableCell className="font-medium">{postulante.nombre_usuario}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                                        {postulante.carrera}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="max-w-xs">
                                                    <p className="truncate" title={"Perfil en unibecarios"}>
                                                        <a href={`${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/perfil/${postulante.id_usuario}`} className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">Ir a su perfil de unibecarios</a>
                                                    </p>
                                                </TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={estadosPostulantes[postulante.cv_postulante] || postulante.postulante_estado}
                                                        onValueChange={(value) => handleEstadoChange(postulante.cv_postulante, value, postulante)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className={getEstadoBadgeColor(estadosPostulantes[postulante.cv_postulante] || postulante.postulante_estado)}
                                                                >
                                                                    {estadosPostulantes[postulante.cv_postulante] || postulante.postulante_estado}
                                                                </Badge>
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Pendiente por revisar">
                                                                <Badge className="bg-yellow-100 text-yellow-800">Pendiente por revisar</Badge>
                                                            </SelectItem>
                                                            <SelectItem value="Aceptar">
                                                                <Badge className="bg-green-100 text-green-800">Aceptar</Badge>
                                                            </SelectItem>
                                                            <SelectItem value="Descartar">
                                                                <Badge className="bg-red-100 text-red-800">Descartar</Badge>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleVerCV(postulante)}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Ver CV
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <CVModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} postulante={selectedPostulante} />
        </>
    )
}
