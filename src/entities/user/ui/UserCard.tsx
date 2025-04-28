import { useAtom, useAtomValue } from "jotai"
import { selectedUserIdAtom, showUserModalAtom } from "../../../features/post/model/atoms"
import { useUserQuery } from "../../../features/user/model/hooks/useUserQuery"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogContent, DialogHeader, DialogTitle } from "../../../shared"

export const UserCard = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const selectedUserId = useAtomValue(selectedUserIdAtom)
  const { data: user, isLoading } = useUserQuery(selectedUserId || 0)

  if (!selectedUserId) return null

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        {isLoading ? (
          <div className="text-center">사용자 정보 로딩 중...</div>
        ) : (
          <div className="space-y-4">
            <img src={user?.image} alt={user?.username} className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="text-xl font-semibold text-center">{user?.username}</h3>
            <div className="space-y-2">
              <p>
                <strong>이름:</strong> {user?.firstName} {user?.lastName}
              </p>
              <p>
                <strong>나이:</strong> {user?.age}
              </p>
              <p>
                <strong>이메일:</strong> {user?.email}
              </p>
              <p>
                <strong>전화번호:</strong> {user?.phone}
              </p>
              <p>
                <strong>주소:</strong> {user?.address?.address}, {user?.address?.city}, {user?.address?.state}
              </p>
              <p>
                <strong>직장:</strong> {user?.company?.name} - {user?.company?.title}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
