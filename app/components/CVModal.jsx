"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { getPostulanteCV } from "@/serverActions/getPostulanteCV"
import toast from "react-hot-toast"
import LoadingOverlay from "./Loading"

export function CVModal({ isOpen, onClose, postulante }) {
    if (!postulante) return null

    const [postulanteCV, setPostulanteCV] = useState(null);

    useEffect(() => {
        const getCV = async () => {
            const response = await getPostulanteCV(postulante.cv_postulante);
            const { ok, cv, message } = response;
            if (ok) {
                toast.success("Se ha obtenido el CV");
                setPostulanteCV(cv);
            } else {
                toast.error(message);
            }
        }
        getCV();
    }, [])

    if (!postulanteCV) return <LoadingOverlay isActive={true} />

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        CV de {postulante.nombre_usuario}
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                    {postulante.postulante_desc}
                    {postulanteCV ? (
                        <iframe
                            src={postulanteCV}
                            width="100%"
                            height="600px"
                            style={{ border: "none" }}
                            title='CURRICULUM'
                        />
                    ) : (null)}
                </div>
            </DialogContent>
        </Dialog>
    )
}
