export default function LoadingSkeleton() {
    return (
        <div className="h-full flex flex-col justify-center text-center items-center ">
            <p>Loading...</p>

            <hr className="w-[50%] bg-neutral-800 my-10" />
            <p>
                During windows of inactivity, the API temporarily suspends
                itself which may delay initial data retrieval.
            </p>
            <p>If this lasts more than a minute, please refresh manually.</p>
        </div>
    );
}
