import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { api } from '@/convex/_generated/api'
import { formatDistanceToNow } from "date-fns";
import { useConvexMutation } from '@/hooks/use-convex-query'
import { Edit, Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ProjectCard = ({ project, onEdit }) => {

    const { mutate: deleteProject, isLoading } = useConvexMutation(api.projects.deleteProject)

    const lastUpdataed = formatDistanceToNow(new Date(project.updatedAt), {
        addSuffix: true,
    })

    const handleDelete = async () => {
        try {
            await deleteProject({ projectId: project._id })
            toast.success("project deleted successfully");
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project. Please try again.");
        }
    }

    return (
        <Card className='py-0 group relative bg-slate-800/50 overflow-hidden hover:border-white/20 transition-all hover:transform hover:scal-[1.02]'>
            <div className='aspect-video bg-slate-700 relative overflow-hidden'>
                {
                    project.thumbnailUrl && (
                        <img src={project.thumbnailUrl} alt={project.title} className='w-full h-full object-cover' />
                    )
                }

                <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2' >
                    <Button variant='glass' size='sm' onClick={onEdit} className='gap-2'>
                        <Edit className='h-4 w-4' />
                        Edit
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger className='flex items-center justify-center gap-2 text-red-400 hover:text-red-300 cursor-pointer' disabled={isLoading}>
                                <Trash2 className='h-4 w-4' />
                                Delete
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{`Are you absolutely sure you want to delete "${project.title}"?`}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-400 text-white" onClick={handleDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <CardContent className={"pb-6"}>
                <h3 className='font-semibold text-white mb-1 truncate'>
                    {project.title}
                </h3>

                <div className='flex items-center justify-between text-sm text-white/70'>
                    <span>Updated {lastUpdataed}</span>
                    <Badge variant={"secondary"} className={"text-xs bg-slate-700 text-white/70"}>
                        {project.width} x {project.height}
                    </Badge>
                </div>
            </CardContent>

        </Card>
    )
}

export default ProjectCard