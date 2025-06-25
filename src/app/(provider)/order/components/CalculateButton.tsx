import { order } from "@/api/order";
import Button from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Swal from "sweetalert2";

type CalculateButtonProps = {
  setSelectedCounts: React.Dispatch<
    React.SetStateAction<Record<number, number>>
  >;
  totalPrice: string;
};

function CalculateButton({
  setSelectedCounts,
  totalPrice,
}: CalculateButtonProps) {
  const orderMutation = useMutation({
    mutationFn: order,
    onSuccess: (res) => {
      const { success, message } = res;

      if (success) {
        Swal.fire("결제 완료", "", "success").then(() => {
          setSelectedCounts({});
        });
        // 전역 상태 적용 또는 라우터 이동은 여기에 추가 가능
      } else {
        toast.error(message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button onClick={() => orderMutation.mutate()} className="w-full">
      {orderMutation.isPending ? `결제중..` : `총 합계: ${totalPrice}원`}
    </Button>
  );
}

export default CalculateButton;
