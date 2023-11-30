// import { useCallback } from "react";

// import { User as TUser, UserKeys } from "../../lib/types";
// import { COLUMNS } from "../../data/constants";
// import { getUsers } from "../../services/apiUsers";
// import usePaginatedItems from "../../hooks/usePaginatedItems";

// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Chip,
//   Pagination,
//   Skeleton,
// } from "@nextui-org/react";

// const UserTable = () => {
//   const rowsPerPage = 5;
//   const {
//     error,
//     isLoading,
//     setPage,
//     totalPages,
//     paginatedItems: users,
//     page,
//   } = usePaginatedItems({
//     queryKey: ["users"],
//     queryFn: getUsers,
//     rowsPerPage,
//   });

//   const renderCell = useCallback((user: TUser, columnKey: keyof TUser) => {
//     const cellValue = user[columnKey];

//     switch (columnKey) {
//       case UserKeys.STATUS:
//         return (
//           <Chip color={"success"} size="sm" variant="flat">
//             {"Online"}
//           </Chip>
//         );

//       case UserKeys.NAME:
//         return (
//           <User
//             avatarProps={{
//               radius: "lg",
//               src: user.image,
//             }}
//             description={user.email}
//             name={user.username}
//           >
//             {user.email}
//           </User>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   if (error) return <p>Something went wrong...</p>;

//   const skeletonRows = Array.from({ length: rowsPerPage }).map((_, index) => (
//     <TableRow key={index}>
//       {COLUMNS.map((column) => (
//         <TableCell key={column.key}>
//           <Skeleton className="h-10 rounded-lg"></Skeleton>
//         </TableCell>
//       ))}
//     </TableRow>
//   ));

//   return (
//     <Table
//       classNames={{
//         th: ["bg-transparent bg-orange-400 text-white"],
//       }}
//       aria-label="Example table with client side pagination"
//       bottomContent={
//         <div className="flex w-full justify-center">
//           <Pagination
//             isCompact
//             showControls
//             showShadow
//             color="warning"
//             page={page}
//             total={totalPages}
//             onChange={(page) => setPage(page)}
//           />
//         </div>
//       }
//     >
//       <TableHeader columns={COLUMNS}>
//         {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
//       </TableHeader>
//       {isLoading ? (
//         <TableBody>{skeletonRows}</TableBody>
//       ) : (
//         <TableBody emptyContent="No users found" items={users}>
//           {(user) => (
//             <TableRow key={user.id}>
//               {(columnKey) => (
//                 <TableCell>
//                   {renderCell(user, columnKey as keyof TUser)}
//                 </TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       )}
//     </Table>
//   );
// };

// export default UserTable;
